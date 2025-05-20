import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import DoctorDashboard from './pages/DoctorDashboard';
import SidebarLayout from './components/Sidebar';
import MedicalRecordView from './pages/MedicalRecordView';
import AddMedicalRecord from './pages/AddMedicalRecord';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<SidebarLayout />}>
          <Route path="/DoctorDashboard" element={<DoctorDashboard />} />
          <Route path="/records/:patientId" element={<MedicalRecordView/>} />
          <Route path="/records/:patientId/add" element={<AddMedicalRecord />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
