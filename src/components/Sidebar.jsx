import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // ❌ No token = no sidebar
  if (!token || !role) return null;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="vh-100 bg-light p-3 border-end">
      <h5 className="mb-4">HealthTrack</h5>
      <ListGroup variant="flush">

        {role === 'doctor' && (
          <>
            <ListGroup.Item action as={Link} to="/dashboard">
              Dashboard
            </ListGroup.Item>
            <ListGroup.Item action as={Link} to="/patients">
              Patients
            </ListGroup.Item>
            <ListGroup.Item action as={Link} to="/appointments">
              Appointments
            </ListGroup.Item>
            <ListGroup.Item action as={Link} to="/records">
              Medical Records
            </ListGroup.Item>
          </>
        )}

        {role === 'secretary' && (
          <>
            <ListGroup.Item action as={Link} to="/patients">
              Manage Patients
            </ListGroup.Item>
            <ListGroup.Item action as={Link} to="/appointments">
              Manage Appointments
            </ListGroup.Item>
            <ListGroup.Item action as={Link} to="/records">
              View Records
            </ListGroup.Item>
          </>
        )}

        <ListGroup.Item
          action
          variant="danger"
          onClick={handleLogout}
          className="mt-3"
        >
          Logout
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default Sidebar;
