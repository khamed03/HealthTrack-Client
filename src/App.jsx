import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/dashboard';
import Patients from './pages/patients';
import Appointments from './pages/Appointments';
import Records from './pages/records';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Pages with Sidebar */}
      {token && (
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="records" element={<Records />} />
        </Route>
      )}

      {/* Fallback */}
      {!token && <Route path="*" element={<Navigate to="/login" replace />} />}
    </Routes>
  );
};

export default App;
