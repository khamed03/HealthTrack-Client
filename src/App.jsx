import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import DoctorDashboard from './pages/DoctorDashboard';

// Layout
import SidebarLayout from './components/Sidebar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>

        <Route element={<SidebarLayout />}>
          <Route path="/DoctorDashboard" element={<DoctorDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
