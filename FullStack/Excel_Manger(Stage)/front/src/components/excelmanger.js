import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { Typography, message, Layout, Space } from "antd";
import API from "../api/axiosInstance";
import "./auth.css";

// Import des nouveaux composants
import FileCard from "./Dashboard/FileCard";
import DataTable from "./Dashboard/DataTable";
import EditModal from "./Dashboard/EditModal";
import ViewModal from "./Dashboard/ViewModal";

const { Title } = Typography;
const { Content } = Layout;

const ExcelManager = () => {
  const [allFiles, setAllFiles] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    fetchAllFiles();
  }, [navigate]);

  const fetchAllFiles = async () => {
    try {
      const response = await API.get("/data");
      setAllFiles(response.data);
    } catch (error) {
      message.error("Erreur lors du chargement des fichiers");
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        try {
          await API.post("/data/save", { data: jsonData });
          message.success("Fichier importé avec succès");
          fetchAllFiles();
        } catch (error) {
          message.error("Erreur lors de l'import du fichier");
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleExport = async (fileId) => {
    try {
      const response = await API.get(`/data/export/excel/${fileId}`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `exported_data_${fileId}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      message.success("Export réussi !");
    } catch (error) {
      message.error("Erreur lors de l'export");
    }
  };

  const handleDeleteFile = async (fileId) => {
    try {
      await API.delete(`/data/file/${fileId}`);
      message.success("Fichier supprimé avec succès");
      fetchAllFiles();
    } catch (error) {
      message.error("Erreur lors de la suppression du fichier");
    }
  };

  const handleDelete = async (fileId, recordId) => {
    if (!fileId || !recordId) {
      message.error("Impossible de supprimer l'enregistrement : ID manquant");
      return;
    }
    
    try {
      await API.delete(`/data/${fileId}/${recordId}`);
      message.success("Enregistrement supprimé avec succès");
      fetchAllFiles();
    } catch (error) {
      message.error("Erreur lors de la suppression");
    }
  };

  const handleEdit = (record, fileId) => {
    setSelectedRecord({ ...record, fileId });
    setEditModalVisible(true);
  };

  const handleView = (record) => {
    setSelectedRecord(record);
    setViewModalVisible(true);
  };

  const handleEditSubmit = async (values) => {
    if (!selectedRecord?.fileId || !selectedRecord?._id) {
      message.error("Impossible de modifier l'enregistrement : ID manquant");
      return;
    }

    try {
      setLoading(true);
      await API.put(`/data/${selectedRecord.fileId}/${selectedRecord._id}`, values);
      message.success("Modification réussie");
      setEditModalVisible(false);
      fetchAllFiles();
    } catch (error) {
      message.error("Erreur lors de la modification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className="auth-background">
      <Content className="dashboard-content" style={{ padding: '24px' }}>
        <div className="dashboard-container" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Title level={2} style={{ textAlign: "center", color: "white", marginBottom: 32 }}>
            Gestionnaire de Fichiers Excel
          </Title>

          <Space direction="vertical" style={{ width: '100%' }}>
            <div className="upload-section" style={{ textAlign: 'center', marginBottom: 24 }}>
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                style={{
                  background: "white",
                  padding: "12px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}
              />
            </div>

            {allFiles.map((file) => (
              <FileCard
                key={file._id}
                file={file}
                onExport={handleExport}
                onDelete={handleDeleteFile}
              >
                <DataTable
                  data={file.data}
                  fileId={file._id}
                  onEdit={handleEdit}
                  onView={handleView}
                  onDelete={handleDelete}
                />
              </FileCard>
            ))}
          </Space>

          <EditModal
            visible={editModalVisible}
            onCancel={() => setEditModalVisible(false)}
            onSubmit={handleEditSubmit}
            record={selectedRecord}
            loading={loading}
          />

          <ViewModal
            visible={viewModalVisible}
            onCancel={() => setViewModalVisible(false)}
            record={selectedRecord}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default ExcelManager;
