import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/loading';


const Appointments = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    patient_id: '',
    date: '',
    complaint: ''
  });

  const baseURL = 'http://localhost:5000';
  const navigate = useNavigate();

  const role = localStorage.getItem("role"); 
  const token = localStorage.getItem("token");


  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apptRes = await axios.get(`${baseURL}/api/appointments`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const patientRes = await axios.get(`${baseURL}/api/patients`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setIsLoading(false);

        setAppointments(apptRes.data);
        setPatients(patientRes.data);
      } catch (err) {
        console.error("Failed to load appointments:", err.message);
      }
    };

    fetchData();
  }, [token]);

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        doctor_id: localStorage.getItem("user_id")
      };

      if (editing) {
        await axios.put(`${baseURL}/api/appointments/${editing.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${baseURL}/api/appointments`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      const updated = await axios.get(`${baseURL}/api/appointments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(updated.data);
      setShowForm(false);
      setEditing(null);
      setFormData({ patient_id: '', date: '', complaint: '' });
    } catch (err) {
      console.error("Failed to save appointment:", err.message);
    }
  };

  const handleEdit = (appt) => {
    setEditing(appt);
    setFormData({
      patient_id: appt.patient_id,
      date: appt.date?.split('T')[0],
      complaint: appt.complaint
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/api/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const updated = await axios.get(`${baseURL}/api/appointments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(updated.data);
    } catch (err) {
      console.error("Failed to delete appointment:", err.message);
    }
  };

  if (!token || !role) {
    navigate("/login");
    return null;
  }

  if (isLoading) return <Loading/>;

  return (
    <Container className="mt-4">
      <h3>Appointments</h3>

      {role === "secretary" && (
        <Button className="mb-3" onClick={() => setShowForm(true)}>
          Add Appointment
        </Button>
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Date</th>
            <th>Complaint</th>
            {role === "secretary" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => {
            const patient = patients.find(p => p.patient_id === appt.patient_id);
            return (
              <tr key={appt.id}>
                <td>{patient?.full_name || 'Unknown'}</td>
                <td>{appt.date?.split('T')[0]}</td>
                <td>{appt.complaint}</td>
                {role === "secretary" && (
                  <td>
                    <Button size="sm" variant="info" onClick={() => handleEdit(appt)}>
                      Edit
                    </Button>{' '}
                    <Button size="sm" variant="danger" onClick={() => handleDelete(appt.id)}>
                      Delete
                    </Button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? 'Edit' : 'Add'} Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Patient</Form.Label>
              <Form.Select
                name="patient_id"
                value={formData.patient_id}
                onChange={handleInputChange}
              >
                <option value="">-- Select Patient --</option>
                {patients.map(p => (
                  <option key={p.patient_id} value={p.patient_id}>
                    {p.full_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Complaint</Form.Label>
              <Form.Control
                type="text"
                name="complaint"
                value={formData.complaint}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editing ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Appointments;
