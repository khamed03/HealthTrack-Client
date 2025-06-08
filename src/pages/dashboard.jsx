import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
const url = import.meta.env.VITE_SERVER_URL;

const DoctorDashboard = () => {
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const res = await axios.get(`${url}/api/dashboard/count`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        setTotalPatients(res.data.total_patients);
        setTotalRecords(res.data.total_records);
        setTotalAppointments(res.data.total_appointments);
      } catch (err) {
        console.error("Dashboard fetch error:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <Container>
      <h2 className="mb-4">Doctor Dashboard</h2>
      <Row className="g-4">
        <Col md={4}>
          <Card className="text-white bg-primary">
            <Card.Body>
              <Card.Title>Total Patients</Card.Title>
              <Card.Text>{totalPatients}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-white bg-success">
            <Card.Body>
              <Card.Title>Total Records</Card.Title>
              <Card.Text>{totalRecords}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-white bg-info">
            <Card.Body>
              <Card.Title>Total Appointments</Card.Title>
              <Card.Text>{totalAppointments}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorDashboard;
