import React from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const MedicalRecordView = () => {
  const navigate = useNavigate();

  // Example mock data (you'll replace this with API data)
  const patient = {
    id: 123,
    name: 'Ahmad Yasin',
    age: 45,
    gender: 'Male',
  };

  const records = [
    {
      id: 1,
      date: '2025-05-15',
      diagnosis: 'Diabetes Type II',
      treatment: 'Metformin 500mg',
      notes: 'Needs follow-up in 2 weeks.',
    },
    {
      id: 2,
      date: '2025-04-10',
      diagnosis: 'Hypertension',
      treatment: 'Amlodipine 10mg',
      notes: 'Stable BP readings.',
    },
  ];

  const handleAddRecord = () => {
    navigate(`/records/${patient.id}/add`);
  };

  return (
    <Container>
      <h3 className="mb-4">Patient Medical Records</h3>

      <Card className="mb-4">
        <Card.Body>
          <h5>{patient.name}</h5>
          <p>
            <strong>Age:</strong> {patient.age}<br />
            <strong>Gender:</strong> {patient.gender}
          </p>
          <Button variant="primary" onClick={handleAddRecord}>Add New Record</Button>
        </Card.Body>
      </Card>

      <Row xs={1} md={2} className="g-4">
        {records.map((rec) => (
          <Col key={rec.id}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>{rec.date}</Card.Title>
                <Card.Text>
                  <strong>Diagnosis:</strong> {rec.diagnosis}<br />
                  <strong>Treatment:</strong> {rec.treatment}<br />
                  <strong>Notes:</strong> {rec.notes}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MedicalRecordView;
