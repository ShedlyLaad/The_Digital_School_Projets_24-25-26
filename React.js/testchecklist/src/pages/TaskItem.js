import React from 'react';
import './styles/Checklist.css';
const TaskItem = ({ task, onToggle }) => {
  return (
    <li className={`task-item ${task.status === 1 ? 'done' : ''}`} onClick={onToggle}>
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      <p>Status: {task.status === 0 ? 'Non fait' : 'Fait'}</p>
    </li>
  );
};

export default TaskItem;
