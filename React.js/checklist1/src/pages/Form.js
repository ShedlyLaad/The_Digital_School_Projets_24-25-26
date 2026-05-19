import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([{ title: '', description: '', status: 0 }]);

  useEffect(() => {
    if (id) {
      const fetchChecklist = async () => {
        const token = "YOUR_TOKEN_HERE";
        const response = await axios.get(`https://greenvelvet.alwaysdata.net/pfc/checklist?id=${id}`, {
          headers: { 'token': token }
        });
        const checklist = response.data;
        setTitle(checklist.title);
        setDescription(checklist.description);
        setTasks(checklist.todo);
      };
      fetchChecklist();
    }
  }, [id]);

  const handleSave = async () => {
    const token = "YOUR_TOKEN_HERE";
    const checklist = { title, description, todo: tasks };
    if (id) {
      await axios.post(`https://greenvelvet.alwaysdata.net/pfc/checklist/update`, { ...checklist, id }, {
        headers: { 'token': token }
      });
    } else {
      await axios.post(`https://greenvelvet.alwaysdata.net/pfc/checklist/add`, checklist, {
        headers: { 'token': token }
      });
    }
    history.push('/');
  };

  const handleTaskChange = (index, field, value) => {
    const newTasks = [...tasks];
    newTasks[index][field] = value;
    setTasks(newTasks);
  };

  const addTask = () => {
    setTasks([...tasks, { title: '', description: '', status: 0 }]);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, taskIndex) => taskIndex !== index));
  };

  return (
    <div>
      <h1>{id ? 'Edit Checklist' : 'New Checklist'}</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        <div>
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description</label>
          <input value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <h2>Tasks</h2>
          {tasks.map((task, index) => (
            <div key={index}>
              <input value={task.title} onChange={(e) => handleTaskChange(index, 'title', e.target.value)} required />
              <input value={task.description} onChange={(e) => handleTaskChange(index, 'description', e.target.value)} />
              <button type="button" onClick={() => removeTask(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addTask}>Add Task</button>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Form;
