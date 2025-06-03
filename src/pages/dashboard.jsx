import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [recordsCount, setRecordsCount] = useState(0);
  const [patientsCount, setPatientsCount] = useState(0);
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const [recordsRes, patientsRes, appointmentsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/records/all', { headers }),
          axios.get('http://localhost:5000/api/patients', { headers }),
          axios.get('http://localhost:5000/api/appointments', { headers }),
        ]);

        setRecordsCount(recordsRes.data.length);
        setPatientsCount(patientsRes.data.length);
        setAppointmentsCount(appointmentsRes.data.length);
      } catch (err) {
        console.error("Failed to load dashboard data:", err.message);
      }
    };

    fetchData();
  }, [token]);

  if (!token || role !== "doctor") {
    navigate("/login");
    return null;
  }

  return (
    <Container className="mt-4">
      <h3>Doctor Dashboard</h3>
      <Row className="mt-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Medical Records</Card.Title>
              <Card.Text>{recordsCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Patients</Card.Title>
              <Card.Text>{patientsCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Appointments</Card.Title>
              <Card.Text>{appointmentsCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
