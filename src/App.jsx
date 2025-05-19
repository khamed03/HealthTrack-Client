import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import DoctorDashboard from './pages/DoctorDashboard';
import SidebarLayout from './components/Sidebar';
import MedicalRecordView from './pages/MedicalRecordView';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<SidebarLayout />}>
          <Route path="/DoctorDashboard" element={<DoctorDashboard />} />
          <Route path="/records/:patientId" element={<MedicalRecordView/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
