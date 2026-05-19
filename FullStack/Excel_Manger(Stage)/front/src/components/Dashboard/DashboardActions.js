import React, { useRef } from 'react';
import { Input, Button, Upload, message } from 'antd';
import { SearchOutlined, UploadOutlined } from '@ant-design/icons';
import './styles/DashboardActions.css';

const { Search } = Input;

const DashboardActions = ({ onSearch, onFileUpload }) => {
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.name.split('.').pop().toLowerCase();
      if (['xlsx', 'xls', 'csv'].includes(fileType)) {
        onFileUpload(e);
      } else {
        message.error('Veuillez sélectionner un fichier Excel ou CSV valide');
      }
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="dashboard-actions">
      <div className="search-section">
        <Search
          placeholder="Rechercher dans les données..."
          allowClear
          enterButton={
            <Button type="primary" icon={<SearchOutlined />}>
              Rechercher
            </Button>
          }
          size="large"
          onChange={(e) => onSearch(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="upload-section">
        <input
          type="file"
          onChange={handleFileUpload}
          accept=".xlsx,.xls,.csv"
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <Button
          type="primary"
          icon={<UploadOutlined />}
          size="large"
          onClick={() => fileInputRef.current.click()}
          className="upload-button"
        >
          Importer un fichier Excel
        </Button>
      </div>
    </div>
  );
};

export default DashboardActions;