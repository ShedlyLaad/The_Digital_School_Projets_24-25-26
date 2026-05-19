import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import TaskItem from './TaskItem';
import './styles/Checklist.css';

const Checklist = () => {
  const { id } = useParams();
  const history = useHistory();
  const [checklist, setChecklist] = useState(null);

  useEffect(() => {
    // Remplacer l'URL par celle de votre API
    axios.get(`https://api.example.com/checklists/${id}`)
      .then(response => setChecklist(response.data))
      .catch(error => console.error('Error fetching checklist:', error));
  }, [id]);

  const handleTaskToggle = (taskId) => {
    const updatedTasks = checklist.tasks.map(task => 
      task.id === taskId ? { ...task, status: task.status === 0 ? 1 : 0 } : task
    );
    const allTasksDone = updatedTasks.every(task => task.status === 1);
    const updatedChecklist = {
      ...checklist,
      tasks: updatedTasks,
      status: allTasksDone ? 2 : 1
    };

    // Mettre à jour l'API
    axios.put(`https://api.example.com/checklists/${id}`, updatedChecklist)
      .then(response => setChecklist(response.data))
      .catch(error => console.error('Error updating checklist:', error));
  };

  if (!checklist) return <p>Loading...</p>;

  return (
    <div className="checklist">
      <h1>{checklist.title}</h1>
      <p>{checklist.description}</p>
      <p>Status: {checklist.status === 0 ? 'Vierge' : checklist.status === 1 ? 'En cours' : 'Terminée'}</p>
      <ul>
        {checklist.tasks.map(task => (
          <TaskItem key={task.id} task={task} onToggle={() => handleTaskToggle(task.id)} />
        ))}
      </ul>
      <button onClick={() => history.push('/')}>Back to Dashboard</button>
    </div>
  );
};

export default Checklist;
