import React, { useState, useEffect } from 'react';
import { message, Empty, Spin, Modal } from 'antd';
import axiosInstance from '../../api/axiosInstance';
import FileCard from './FileCard';
import DataTable from './DataTable';
import EditModal from './EditModal';
import ViewModal from './ViewModal';
import DashboardActions from './DashboardActions';
import './styles/Dashboard.css';
import * as XLSX from 'xlsx';

const ExcelManager = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [currentFileId, setCurrentFileId] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axiosInstance.get('/data');
      setFiles(response.data);
      setLoading(false);
    } catch (error) {
      message.error('Erreur lors du chargement des fichiers');
      setLoading(false);
    }
  };

  const processExcelFile = (worksheet) => {
    return XLSX.utils.sheet_to_json(worksheet, {
      raw: false,
      dateNF: 'yyyy-mm-dd',
      defval: '',
      blankrows: false
    });
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          
          const jsonData = processExcelFile(worksheet);

          if (!jsonData || jsonData.length === 0) {
            message.error('Le fichier est vide ou mal formaté');
            setLoading(false);
            return;
          }

          const response = await axiosInstance.post('/data/save', {
            data: jsonData,
            fileName: file.name,
            originalName: file.name,
            lastModified: new Date(file.lastModified)
          });
          
          if (response.data) {
            const { updated, changes } = response.data;
            const actionType = updated ? 'mis à jour' : 'importé';
            let changeDetails = '';
            
            if (changes) {
              changeDetails = ` (${changes.updated} modifiés, ${changes.created} créés, ${changes.unchanged} inchangés)`;
            }
            
            message.success(`Fichier ${actionType} avec succès${changeDetails}`);
            
            if (updated) {
              setFiles(prevFiles => prevFiles.map(f => 
                f._id === response.data.data._id ? response.data.data : f
              ));
            } else {
              setFiles(prevFiles => [response.data.data, ...prevFiles]);
            }

            await fetchFiles();
          }
        } catch (error) {
          console.error('Erreur lors du traitement:', error);
          message.error(error.response?.data?.message || 'Erreur lors du traitement du fichier');
        } finally {
          setLoading(false);
        }
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Erreur lors de la lecture:', error);
      message.error('Erreur lors de la lecture du fichier');
      setLoading(false);
    }
  };

  const handleExport = async (fileId) => {
    try {
      const response = await axiosInstance.get(`/data/export/excel/${fileId}`, {
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `excel_export_${Date.now()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      message.success('Fichier exporté avec succès');
    } catch (error) {
      message.error('Erreur lors de l\'exportation du fichier');
    }
  };

  const handleDelete = async (fileId) => {
    try {
      await axiosInstance.delete(`/data/file/${fileId}`);
      setFiles(files.filter(file => file._id !== fileId));
      message.success('Fichier supprimé avec succès');
    } catch (error) {
      message.error('Erreur lors de la suppression du fichier');
    }
  };

  const handleEdit = async (record, fileId) => {
    try {
      const response = await axiosInstance.get(`/data/${fileId}`);
      const currentFile = response.data;
      const currentRecord = currentFile.data.find(r => r._id === record._id);
      
      if (currentRecord) {
        setSelectedRecord(currentRecord);
        setCurrentFileId(fileId);
        setEditModalVisible(true);
      } else {
        message.error('Enregistrement non trouvé ou déjà supprimé');
      }
    } catch (error) {
      message.error('Erreur lors de la récupération des données');
    }
  };

  const handleView = (record) => {
    setSelectedRecord(record);
    setViewModalVisible(true);
  };

  const handleEditSubmit = async (values) => {
    setEditLoading(true);
    try {
      const response = await axiosInstance.put(
        `/data/${currentFileId}/${selectedRecord._id}`, 
        values
      );
      
      if (response.data) {
        setFiles(prevFiles => prevFiles.map(file => {
          if (file._id === currentFileId) {
            return {
              ...file,
              data: file.data.map(record => 
                record._id === selectedRecord._id ? 
                  response.data.data.data.find(r => r._id === selectedRecord._id) : 
                  record
              ),
              fileVersion: response.data.data.fileVersion,
              fileHistory: response.data.data.fileHistory
            };
          }
          return file;
        }));

        message.success('Enregistrement modifié avec succès');
        setEditModalVisible(false);
      }
    } catch (error) {
      message.error('Erreur lors de la modification de l\'enregistrement');
    } finally {
      setEditLoading(false);
    }
  };

  const handleRecordDelete = async (fileId, recordId) => {
    try {
      await axiosInstance.delete(`/data/${fileId}/${recordId}`);
      const updatedFiles = files.map(file => {
        if (file._id === fileId) {
          return {
            ...file,
            data: file.data.filter(record => record._id !== recordId)
          };
        }
        return file;
      });
      setFiles(updatedFiles);
      message.success('Enregistrement supprimé avec succès');
    } catch (error) {
      message.error('Erreur lors de la suppression de l\'enregistrement');
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filterData = (data) => {
    if (!searchQuery) return data;
    
    return data.filter(record => {
      return Object.values(record).some(value => 
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <p>Chargement des données...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Gestionnaire de fichiers Excel</h1>
      
      <DashboardActions 
        onSearch={handleSearch}
        onFileUpload={handleFileUpload}
      />

      <div className="files-container">
        {files.length === 0 ? (
          <Empty
            description={
              <span>Aucun fichier Excel n'a été importé</span>
            }
          />
        ) : (
          files.map((file) => (
            <FileCard
              key={file._id}
              file={file}
              onExport={() => handleExport(file._id)}
              onDelete={() => handleDelete(file._id)}
            >
              <DataTable
                data={filterData(file.data)}
                fileId={file._id}
                onEdit={handleEdit}
                onView={handleView}
                onDelete={handleRecordDelete}
              />
            </FileCard>
          ))
        )}
      </div>

      <EditModal
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onSubmit={handleEditSubmit}
        record={selectedRecord}
        loading={editLoading}
      />

      <ViewModal
        visible={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        record={selectedRecord}
      />
    </div>
  );
};

export default ExcelManager;
