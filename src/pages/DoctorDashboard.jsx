import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';

const DoctorDashboard = () => {
  // Mocked list of patients — replace with data from API
  const patients = [
    { id: 1, name: 'Ahmad Yasin', age: 45, condition: 'Diabetes' },
    { id: 2, name: 'Layla Nassar', age: 30, condition: 'Hypertension' },
    { id: 3, name: 'Mohammed Kareem', age: 65, condition: 'Asthma' },
  ];

  const handleViewRecords = (id) => {
    // Example: navigate(`/records/${id}`)
    console.log(`View records for patient ID ${id}`);
  };

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        {/* Main Content */}
        <Col md={9} className="p-4 bg-light">
          <h3 className="mb-4">Welcome, Dr. Ahmad</h3>

          <Row xs={1} md={2} lg={2} className="g-4">
            {patients.map((patient) => (
              <Col key={patient.id}>
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title>{patient.name}</Card.Title>
                    <Card.Text>
                      <strong>Age:</strong> {patient.age} <br />
                      <strong>Condition:</strong> {patient.condition}
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => handleViewRecords(patient.id)}
                    >
                      View Records
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};


export default DoctorDashboard;
