import React from 'react';
import './styles/Dashboard.css';

const ChecklistItem = ({ checklist, onDelete }) => {
  const { id, title, description, status, tasks } = checklist;

  const getStatusText = (status) => {
    switch (status) {
      case 0: return 'Vierge';
      case 1: return 'En cours';
      case 2: return 'Terminée';
      default: return '';
    }
  };

  const tasksDone = tasks.filter(task => task.status === 1).length;

  return (
    <div className="checklist-item">
      <h2>{title}</h2>
      <p>{description}</p>
      <p>Status: {getStatusText(status)}</p>
      <p>Tasks: {tasksDone} / {tasks.length}</p>
      <button className="edit-button">Edit</button>
      <button className="delete-button" onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
};

export default ChecklistItem;
