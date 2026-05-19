import React, { useMemo, useState } from 'react';
import { Card, Button, Space, Popconfirm, Badge, Tooltip, Statistic, Row, Col, Modal, Timeline } from 'antd';
import { 
  ExportOutlined, 
  DeleteOutlined, 
  FileExcelOutlined,
  FieldTimeOutlined,
  TeamOutlined,
  FileTextOutlined,
  HistoryOutlined 
} from '@ant-design/icons';
import './styles/FileCard.css';

const FileCard = ({ file, onExport, onDelete, children }) => {
  const [historyVisible, setHistoryVisible] = useState(false);
  const createdDate = new Date(file.createdAt);
  const lastModified = new Date(file.lastModified);
  
  const formattedDate = createdDate.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const statistics = useMemo(() => {
    const columnCount = file.data[0] ? Object.keys(file.data[0]).length : 0;
    const recordCount = file.data.length;
    const daysSinceCreation = Math.floor((new Date() - createdDate) / (1000 * 60 * 60 * 24));
    const version = file.fileVersion || 1;

    return {
      columns: columnCount,
      records: recordCount,
      days: daysSinceCreation,
      version
    };
  }, [file.data, createdDate, file.fileVersion]);

  const renderHistory = () => {
    if (!file.fileHistory || file.fileHistory.length === 0) {
      return <p>Aucun historique disponible</p>;
    }

    return (
      <Timeline>
        {file.fileHistory.map((entry, index) => {
          const date = new Date(entry.timestamp);
          const formattedHistoryDate = date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });

          let changes = '';
          if (entry.changes) {
            if (entry.changeType === 'create') {
              changes = `Import initial - ${entry.changes.recordCount || 0} enregistrements`;
            } else if (entry.changeType === 'update') {
              changes = `Modifiés: ${entry.changes.updated}, Créés: ${entry.changes.created}, Inchangés: ${entry.changes.unchanged}`;
            }
          }

          return (
            <Timeline.Item 
              key={index}
              color={entry.changeType === 'create' ? 'green' : 'blue'}
            >
              <p><strong>{formattedHistoryDate}</strong></p>
              <p>{entry.changeType === 'create' ? 'Création' : 'Mise à jour'}</p>
              <p>{changes}</p>
            </Timeline.Item>
          );
        })}
      </Timeline>
    );
  };

  return (
    <Card 
      className="file-card"
      title={
        <Space>
          <FileExcelOutlined className="file-icon" />
          <span className="file-title">{file.originalName}</span>
          <Badge 
            count={file.data.length} 
            className="record-count"
            title={`${file.data.length} enregistrements`}
            overflowCount={9999}
          />
          <Tooltip title={`Version ${statistics.version}`}>
            <Badge 
              count={`v${statistics.version}`} 
              style={{ backgroundColor: '#52c41a' }}
            />
          </Tooltip>
          <span className="file-date">
            Dernière modification: {lastModified.toLocaleDateString('fr-FR')}
          </span>
        </Space>
      }
      extra={
        <Space>
          <Tooltip title="Historique des modifications">
            <Button
              icon={<HistoryOutlined />}
              onClick={() => setHistoryVisible(true)}
              className="history-button"
            />
          </Tooltip>
          <Tooltip title="Exporter en Excel">
            <Button 
              type="primary" 
              icon={<ExportOutlined />}
              onClick={() => onExport(file._id)}
              className="export-button"
            />
          </Tooltip>
          <Tooltip title="Supprimer le fichier">
            <Popconfirm
              title="Supprimer le fichier"
              description="Êtes-vous sûr de vouloir supprimer ce fichier ? Cette action est irréversible."
              onConfirm={() => onDelete(file._id)}
              okText="Oui"
              cancelText="Non"
              placement="left"
              okButtonProps={{ danger: true }}
            >
              <Button 
                type="primary" 
                danger
                icon={<DeleteOutlined />}
                className="delete-button"
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      }
    >
      <div className="file-stats">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={6}>
            <Statistic
              title="Colonnes"
              value={statistics.columns}
              prefix={<FileTextOutlined />}
              className="stat-item"
            />
          </Col>
          <Col xs={24} sm={6}>
            <Statistic
              title="Enregistrements"
              value={statistics.records}
              prefix={<TeamOutlined />}
              className="stat-item"
            />
          </Col>
          <Col xs={24} sm={6}>
            <Statistic
              title="Version"
              value={statistics.version}
              prefix={<HistoryOutlined />}
              className="stat-item"
            />
          </Col>
          <Col xs={24} sm={6}>
            <Statistic
              title="Âge (jours)"
              value={statistics.days}
              prefix={<FieldTimeOutlined />}
              className="stat-item"
            />
          </Col>
        </Row>
      </div>

      {children}

      <Modal
        title={`Historique des modifications - ${file.originalName}`}
        open={historyVisible}
        onCancel={() => setHistoryVisible(false)}
        footer={[
          <Button key="close" type="primary" onClick={() => setHistoryVisible(false)}>
            Fermer
          </Button>
        ]}
        width={700}
        className="history-modal"
      >
        {renderHistory()}
      </Modal>
    </Card>
  );
};

export default FileCard;