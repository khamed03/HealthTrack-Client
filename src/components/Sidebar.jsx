import React from 'react';
import { ListGroup, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const getUserRole = (user) => {
  if (!user) return null;
  if (user.email.includes('doctor')) return 'doctor';
  if (user.email.includes('secretary')) return 'secretary';
  return 'guest';
};

const Sidebar = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const role = getUserRole(user);

  if (isLoading || !isAuthenticated) return null; // don't show sidebar if not logged in

  return (
    <Container className="p-3 bg-light" style={{ height: '100vh' }}>
      <h4 className="mb-4">HealthTrack</h4>

      <ListGroup variant="flush">
        {role === 'doctor' && (
          <>
            <ListGroup.Item as={Link} to="/dashboard">Dashboard</ListGroup.Item>
            <ListGroup.Item as={Link} to="/records">Medical Records</ListGroup.Item>
            <ListGroup.Item as={Link} to="/appointments">Appointments</ListGroup.Item>
          </>
        )}

        {role === 'secretary' && (
          <>
            <ListGroup.Item as={Link} to="/patients">Manage Patients</ListGroup.Item>
            <ListGroup.Item as={Link} to="/appointments">Manage Appointments</ListGroup.Item>
          </>
        )}
      </ListGroup>
    </Container>
  );
};

export default Sidebar;
