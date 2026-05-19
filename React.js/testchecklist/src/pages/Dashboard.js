import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChecklistItem from './ChecklistItem';
import './styles/Dashboard.css';
const Dashboard = () => {
  const [checklists, setChecklists] = useState([]);

  useEffect(() => {
    // Remplacer l'URL par celle de votre API
    axios.get('https://api.example.com/checklists')
      .then(response => setChecklists(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this checklist?')) {
      // Remplacer l'URL par celle de votre API
      axios.delete(`https://api.example.com/checklists/${id}`)
        .then(() => setChecklists(checklists.filter(item => item.id !== id)))
        .catch(error => console.error('Error deleting checklist:', error));
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <button className="new-button">NEW</button>
      {checklists.length === 0 ? (
        <p>No checklists available.</p>
      ) : (
        checklists.map(checklist => (
          <ChecklistItem
            key={checklist.id}
            checklist={checklist}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default Dashboard;
