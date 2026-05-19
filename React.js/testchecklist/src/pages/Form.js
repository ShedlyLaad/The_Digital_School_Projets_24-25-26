import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import './styles/Form.css';

const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const [checklist, setChecklist] = useState({
    title: '',
    description: '',
    status: 0,
    tasks: []
  });

  useEffect(() => {
    if (id) {
      // Remplacer l'URL par celle de votre API
      axios.get(`https://api.example.com/checklists/${id}`)
        .then(response => setChecklist(response.data))
        .catch(error => console.error('Error fetching checklist:', error));
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChecklist({ ...checklist, [name]: value });
  };

  const handleTaskChange = (index, field, value) => {
    const updatedTasks = checklist.tasks.map((task, i) =>
      i === index ? { ...task, [field]: value } : task
    );
    setChecklist({ ...checklist, tasks: updatedTasks });
  };

  const addTask = () => {
    setChecklist({ ...checklist, tasks: [...checklist.tasks, { title: '', description: '', status: 0 }] });
  };

  const removeTask = (index) => {
    const updatedTasks = checklist.tasks.filter((_, i) => i !== index);
    setChecklist({ ...checklist, tasks: updatedTasks });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      // Remplacer l'URL par celle de votre API
      axios.put(`https://api.example.com/checklists/${id}`, checklist)
        .then(() => history.push('/'))
        .catch(error => console.error('Error updating checklist:', error));
    } else {
      // Remplacer l'URL par celle de votre API
      axios.post(`https://api.example.com/checklists`, checklist)
        .then(() => history.push('/'))
        .catch(error => console.error('Error creating checklist:', error));
    }
  };

  return (
    <div className="form-container">
      <h1>{id ? 'Edit Checklist' : 'New Checklist'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={checklist.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={checklist.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label>Status</label>
          <select
            name="status"
            value={checklist.status}
            onChange={handleInputChange}
          >
            <option value={0}>Vierge</option>
            <option value={1}>En cours</option>
            <option value={2}>Terminée</option>
          </select>
        </div>
        <div>
          <h3>Tasks</h3>
          {checklist.tasks.map((task, index) => (
            <div key={index} className="task-item">
              <input
                type="text"
                placeholder="Task Title"
                value={task.title}
                onChange={(e) => handleTaskChange(index, 'title', e.target.value)}
                required
              />
              <textarea
                placeholder="Task Description"
                value={task.description}
                onChange={(e) => handleTaskChange(index, 'description', e.target.value)}
              ></textarea>
              <button type="button" onClick={() => removeTask(index)}>Remove Task</button>
            </div>
          ))}
          <button type="button" onClick={addTask}>Add Task</button>
        </div>
        <button type="submit" className="save-button">SAVE</button>
      </form>
      <button onClick={() => history.push('/')}>Back to Dashboard</button>
    </div>
  );
};

export default Form;
