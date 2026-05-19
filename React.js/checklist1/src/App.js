// App.js
import React from 'react';
import {BrowserRouter as Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ChecklistForm from './components/ChecklistForm';
import Checklist from './components/Checklist'; 

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    <Route path="/checklist/" element={<Checklist />}/>
      <Route path="/checklist-form/:id?" element={<ChecklistForm />} />
    </Routes>
  );
}

export default App;
