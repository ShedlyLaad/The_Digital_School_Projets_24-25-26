import React, { useEffect, useState } from 'react';
import { getChecklists, deleteChecklist, updateChecklistStatus } from '../api';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button, Popconfirm, message } from 'antd';

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getChecklists();
        console.log('Fetched tasks:', result);
        if (result && result.response) {
          setTasks(result.response);
        } else {
          setError('Failed to load checklists');
        }
      } catch (error) {
        setError('Error fetching checklists');
        console.error('Error fetching checklists:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    setLoadingDelete(true);
    try {
      await deleteChecklist(id);
      setTasks(tasks.filter(task => task.id !== id));
      message.success('Checklist deleted successfully');
    } catch (error) {
      console.error('Error deleting checklist:', error);
      message.error('Failed to delete checklist');
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateChecklistStatus(id, status);
      
      const updatedTasks = tasks.map(task => {
        if (task.id === id) {
          return { ...task, statut: status }; 
        }
        return task;
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating checklist status:', error);
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '130px' }}>
          <Button type="link" onClick={() => navigate(`/checklist/${record.id}`)}>
            view checklist 
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this checklist?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger loading={loadingDelete}>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  if (error) return <div>{error}</div>;

  return (
    <div className="dashboard">
      <Link to="/add-checklist" className="add-checklist-button"> New Checklist</Link>
      {tasks.length === 0 ? (
        <div className="no-data">No Data dashboard</div>
      ) : (
        <Table
          dataSource={tasks}
          columns={columns}
          rowKey="id"
          loading={loading}
        />
      )}
    </div>
  );
};

export default DashboardPage;
