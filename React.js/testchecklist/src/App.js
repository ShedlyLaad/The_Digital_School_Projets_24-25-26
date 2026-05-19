import React from 'react';
import { BrowserRouter as Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Checklist from './pages/Checklist';
import Form from './pages/Form';
import './styles/Checklist.css';
import './styles/Form.css';
import './styles/Dashboard.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" exact component={Dashboard} />
      <Route path="/checklist/:id" component={Checklist} />
      <Route path="/form/:id?" component={Form} /> {/* id is optional for new checklist */}
    </Routes>
  );
};

export default App;
