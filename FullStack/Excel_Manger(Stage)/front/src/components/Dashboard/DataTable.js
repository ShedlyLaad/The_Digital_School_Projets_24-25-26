import React, { useMemo } from 'react';
import { Table, Button, Space, Popconfirm, Tooltip, Input, Badge } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import './styles/DataTable.css';

const DataTable = ({ data, fileId, onEdit, onView, onDelete }) => {
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Rechercher ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Chercher
          </Button>
          <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
            Réinitialiser
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
  });

  const columns = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const baseColumns = Object.keys(data[0])
      .filter(key => !['_id', 'fileId', 'history'].includes(key))
      .map(key => ({
        title: key.charAt(0).toUpperCase() + key.slice(1),
        dataIndex: key,
        key: key,
        sorter: (a, b) => {
          if (typeof a[key] === 'string') {
            return a[key].localeCompare(b[key]);
          }
          return a[key] - b[key];
        },
        ...getColumnSearchProps(key),
        ellipsis: true,
      }));

    return [
      ...baseColumns,
      {
        title: 'Version',
        key: 'version',
        width: 100,
        render: (_, record) => (
          <Tooltip title={`Dernière modification: ${
            record.history && record.history.length > 0
              ? new Date(record.history[record.history.length - 1].timestamp).toLocaleDateString('fr-FR')
              : 'Non modifié'
          }`}>
            <Badge 
              count={`v${record.version || 1}`}
              style={{ 
                backgroundColor: '#52c41a',
                fontSize: '12px',
                minWidth: '40px'
              }}
            />
          </Tooltip>
        ),
      },
      {
        title: 'Actions',
        key: 'actions',
        fixed: 'right',
        width: 180,
        render: (_, record) => (
          <Space size="small" className="action-buttons">
            <Tooltip title="Modifier">
              <Button 
                type="primary"
                icon={<EditOutlined />}
                onClick={() => onEdit(record, fileId)}
                className="edit-button"
              />
            </Tooltip>
            <Tooltip title="Voir les détails">
              <Button 
                type="default"
                icon={<EyeOutlined />}
                onClick={() => onView(record)}
                className="view-button"
              />
            </Tooltip>
            <Tooltip title="Supprimer">
              <Popconfirm
                title="Supprimer l'enregistrement"
                description="Êtes-vous sûr de vouloir supprimer cet enregistrement ?"
                onConfirm={() => onDelete(fileId, record._id)}
                okText="Oui"
                cancelText="Non"
                placement="left"
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
        ),
      },
    ];
  }, [data, fileId, onEdit, onView, onDelete]);

  return (
    <div className="data-table-container">
      <Table
        dataSource={data}
        columns={columns}
        className="excel-data-table"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} sur ${total} entrées`,
        }}
        scroll={{ x: 'max-content' }}
        size="middle"
        rowKey="_id"
      />
    </div>
  );
};

export default DataTable;