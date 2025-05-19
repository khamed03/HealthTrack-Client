import React from 'react';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Replace with actual Auth0 logout or auth cleanup
    console.log("Logged out");
    navigate('/');
  };

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        {/* Sidebar */}
        <Col md={2} className="bg-primary text-white p-3">
          <h5 className="text-white mb-4">HealthTrack</h5>
          <ListGroup variant="flush">
            <ListGroup.Item className="bg-primary text-white border-0" action onClick={() => navigate('/DoctorDashboard')}>
              Dashboard
            </ListGroup.Item>
            <ListGroup.Item className="bg-primary text-white border-0" action onClick={() => navigate('/records/123')}>
              Medical Records
            </ListGroup.Item>
          </ListGroup>
          <div className="mt-auto pt-4">
            <Button variant="outline-light" onClick={handleLogout} className="w-100">
              Logout
            </Button>
          </div>
        </Col>

        {/* Main Content Area */}
        <Col md={10} className="p-4 bg-light">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default Sidebar;
