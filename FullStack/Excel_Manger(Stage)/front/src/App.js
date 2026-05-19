import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ExcelManager from './components/Dashboard/ExcelManager';
import './App.css';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <ExcelManager />
            </PrivateRoute>
          } 
        />
        {/* Rediriger /excelmanger vers / */}
        <Route path="/excelmanger" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
