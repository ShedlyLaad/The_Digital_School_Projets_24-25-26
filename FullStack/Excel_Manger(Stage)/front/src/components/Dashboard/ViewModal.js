import React from 'react';
import { Modal, Descriptions, Button } from 'antd';
import './styles/Modal.css';

const ViewModal = ({ visible, onCancel, record }) => {
  if (!record) return null;

  const renderValue = (value) => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'boolean') return value ? 'Oui' : 'Non';
    return String(value);
  };

  const filteredEntries = Object.entries(record).filter(
    ([key]) => !['_id', 'key', 'fileId'].includes(key)
  );

  return (
    <Modal
      title="Détails de l'enregistrement"
      open={visible}
      onCancel={onCancel}
      className="view-modal"
      footer={[
        <Button key="close" onClick={onCancel} type="primary">
          Fermer
        </Button>
      ]}
      centered
      width={700}
    >
      <div className="record-details">
        <Descriptions 
          bordered
          column={1}
          size="middle"
          className="record-descriptions"
        >
          {filteredEntries.map(([key, value]) => (
            <Descriptions.Item 
              key={key} 
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              className="description-item"
            >
              {renderValue(value)}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </div>
    </Modal>
  );
};

export default ViewModal;