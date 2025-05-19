import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AppNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Auth0 logout or manual auth cleanup
    console.log("Logging out...");
    navigate('/');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand onClick={() => navigate('/doctor-dashboard')} style={{ cursor: 'pointer' }}>
          HealthTrack
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/doctor-dashboard')}>Dashboard</Nav.Link>
            <Nav.Link onClick={() => navigate('/records/123')}>Medical Records</Nav.Link>
          </Nav>
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
