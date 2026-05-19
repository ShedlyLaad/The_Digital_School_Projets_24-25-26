import React, { useState } from 'react';
import { addChecklist } from '../api';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Select } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const FormPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const newChecklist = await addChecklist(title, description, tasks);
      console.log('New checklist added:', newChecklist);

      setTitle('');
      setDescription('');
      setTasks([]);
      console.log('ajoute')
        navigate('/');
    } catch (error) {
      console.error('Error adding checklist:', error);
    }
  };

  const handleTaskChange = (index, key, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index][key] = value;
    setTasks(updatedTasks);
  };

  const addTask = () => {
    setTasks([...tasks, { title: '', description: '', status: 0 }]);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div className="form-container1">
      <h2>Add New Checklist</h2>
      <Form onFinish={handleSubmit} className='form'>
        <Form.Item label="Title">
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input.TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
          />
        </Form.Item>
        <Button type="button" onClick={addTask} className="add-task-btn" icon={<PlusOutlined />}>
          Add Task
        </Button>
        {tasks.map((task, index) => (
          <div key={index} className="task-container">
            <Form.Item label="Title">
              <Input
                type="text"
                value={task.title}
                onChange={(e) => handleTaskChange(index, 'title', e.target.value)}
                className="input-field"
              />
            </Form.Item>
            <Form.Item label="Description">
              <Input.TextArea
                value={task.description}
                onChange={(e) => handleTaskChange(index, 'description', e.target.value)}
                className="input-field"
              />
            </Form.Item>
            <Form.Item label="Status">
              <Select
                value={task.status}
                onChange={(value) => handleTaskChange(index, 'status', value)}
                className="input-field"
              >
                <Option value={0}>Not Done</Option>
                <Option value={1}>In Progress</Option>
                <Option value={2}>Done</Option>
              </Select>
            </Form.Item>
            <Button
              type="button"
              onClick={() => deleteTask(index)}
              className="delete-task-btn"
              icon={<DeleteOutlined />}
            />
          </div>
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-btn">
            Add Checklist
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormPage;
