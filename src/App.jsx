import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Home from './pages/Home';
import DoctorDashboard from './pages/DoctorDashboard';
import ManagePatients from './pages/ManagePatients';
import MedicalRecords from './pages/AddMedicalRecord';
import Appointments from './pages/Appointments';
import Layout from './components/Layout';

const App = () => {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) return <p>Loading...</p>;

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Protected layout with sidebar */}
      {isAuthenticated && (
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<DoctorDashboard />} />
          <Route path="patients" element={<ManagePatients />} />
          <Route path="records" element={<MedicalRecords />} />
          <Route path="appointments" element={<Appointments />} />
        </Route>
      )}


      {!isAuthenticated && (
        <Route path="*" element={<Navigate to="/" replace />} />
      )}
    </Routes>
  );
};

export default App;
