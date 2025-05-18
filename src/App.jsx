import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import DoctorDashboard from './pages/DoctorDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/DoctorDashboard" element={<DoctorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
