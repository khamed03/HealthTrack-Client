import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

console.log('Doctor dashboard loaded');

const DoctorDashboard = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [patients, setPatients] = useState([]);
  const [records, setRecords] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const doctorId = user.sub.split('|')[1];
  const baseURL = 'http://localhost:5000';

  useEffect(() => {
  const fetchData = async () => {
    const token = await getAccessTokenSilently();

    const [patientsRes, recordsRes, apptsRes] = await Promise.all([
      axios.get(`${baseURL}/api/patients`, {
        headers: { Authorization: `Bearer ${token}` }
      }),
      axios.get(`${baseURL}/api/records`, {
        headers: { Authorization: `Bearer ${token}` }
      }),
      axios.get(`${baseURL}/api/appointments`, {
        headers: { Authorization: `Bearer ${token}` }
      }),
    ]);

    setPatients(patientsRes.data);
    setRecords(recordsRes.data.filter(r => r.created_by === doctorId));
    setAppointments(apptsRes.data.filter(a => a.doctor_id === doctorId));
  };

  fetchData();
}, [getAccessTokenSilently, doctorId]);


  const today = new Date().toISOString().split('T')[0];
  const todaysAppointments = appointments.filter(a => a.date?.startsWith(today));

  return (
    <Container className="mt-4">
      <h3>Doctor Dashboard</h3>

      <Row className="mb-4">
        <Col md={4}>
          <Card bg="primary" text="white" className="mb-3">
            <Card.Body>
              <Card.Title>Patients</Card.Title>
              <Card.Text>{patients.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card bg="success" text="white" className="mb-3">
            <Card.Body>
              <Card.Title>Medical Records</Card.Title>
              <Card.Text>{records.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card bg="warning" text="dark" className="mb-3">
            <Card.Body>
              <Card.Title>Today's Appointments</Card.Title>
              <Card.Text>{todaysAppointments.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h5>Today's Appointments</h5>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Complaint</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {todaysAppointments.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">No appointments for today.</td>
            </tr>
          ) : (
            todaysAppointments.map((appt) => (
              <tr key={appt.id}>
                <td>{appt.patient_name}</td>
                <td>{appt.complaint}</td>
                <td>{appt.date?.split('T')[1]?.substring(0, 5) || 'N/A'}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default DoctorDashboard;