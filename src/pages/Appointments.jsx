import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Container } from 'react-bootstrap';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const getUserRole = (user) => {
  if (!user) return null;
  if (user.email.includes('doctor')) return 'doctor';
  if (user.email.includes('secretary')) return 'secretary';
  return 'guest';
};

const Appointments = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const role = getUserRole(user);

  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({ doctor_id: '', patient_name: '', date: '', complaint: '' });
  const [showForm, setShowForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);

  const baseURL = 'http://localhost:5000';

  const fetchAppointments = async () => {
    const token = await getAccessTokenSilently();
    const res = await axios.get(`${baseURL}/api/appointments`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const allAppointments = res.data;
    if (role === 'doctor') {
      const doctorId = user.sub.split('|')[1];
      const filtered = allAppointments.filter(a => a.doctor_id === doctorId);
      setAppointments(filtered);
    } else {
      setAppointments(allAppointments);
    }
  };

  useEffect(() => {
  const fetchAppointments = async () => {
    const token = await getAccessTokenSilently();
    const res = await axios.get(`${baseURL}/api/appointments`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const allAppointments = res.data;
    if (role === 'doctor') {
      const doctorId = user.sub.split('|')[1];
      const filtered = allAppointments.filter(a => a.doctor_id === doctorId);
      setAppointments(filtered);
    } else {
      setAppointments(allAppointments);
    }
  };

  fetchAppointments();
}, [getAccessTokenSilently, role, user]);


  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const token = await getAccessTokenSilently();

    const payload = {
      ...formData,
      doctor_id: formData.doctor_id || user.sub.split('|')[1] // fallback for demo
    };

    if (editingAppointment) {
      await axios.put(`${baseURL}/api/appointments/${editingAppointment.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } else {
      await axios.post(`${baseURL}/api/appointments`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }

    setShowForm(false);
    setEditingAppointment(null);
    setFormData({ doctor_id: '', patient_name: '', date: '', complaint: '' });
    fetchAppointments();
  };

  const handleEdit = (appt) => {
    setEditingAppointment(appt);
    setFormData({
      doctor_id: appt.doctor_id,
      patient_name: appt.patient_name,
      date: appt.date.split('T')[0],
      complaint: appt.complaint
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const token = await getAccessTokenSilently();
    await axios.delete(`${baseURL}/api/appointments/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchAppointments();
  };

  return (
    <Container className="mt-4">
      <h3>Appointments</h3>

      {role === 'secretary' && (
        <Button className="mb-3" onClick={() => setShowForm(true)}>Add Appointment</Button>
      )}

      <Table bordered hover>
        <thead>
          <tr>
            <th>Doctor ID</th>
            <th>Patient Name</th>
            <th>Date</th>
            <th>Complaint</th>
            {role === 'secretary' && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a.id}>
              <td>{a.doctor_id}</td>
              <td>{a.patient_name}</td>
              <td>{a.date?.split('T')[0]}</td>
              <td>{a.complaint}</td>
              {role === 'secretary' && (
                <td>
                  <Button size="sm" variant="info" onClick={() => handleEdit(a)}>Edit</Button>{' '}
                  <Button size="sm" variant="danger" onClick={() => handleDelete(a.id)}>Delete</Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      {role === 'secretary' && (
        <Modal show={showForm} onHide={() => setShowForm(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{editingAppointment ? 'Edit' : 'Add'} Appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Doctor ID</Form.Label>
                <Form.Control
                  type="text"
                  name="doctor_id"
                  value={formData.doctor_id}
                  onChange={handleInputChange}
                  placeholder="Doctor ID (UUID)"
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Patient Name</Form.Label>
                <Form.Control
                  type="text"
                  name="patient_name"
                  value={formData.patient_name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Complaint</Form.Label>
                <Form.Control
                  as="textarea"
                  name="complaint"
                  value={formData.complaint}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleSubmit}>Save</Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default Appointments;
