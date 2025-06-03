import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Records = () => {
  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    diagnosis: '',
    treatment: '',
    notes: ''
  });

  const navigate = useNavigate();
  const baseURL = 'http://localhost:5000';

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const user_id = localStorage.getItem('user_id');

 

  useEffect(() => {
    const fetchPatients = async () => {
      const res = await axios.get(`${baseURL}/api/patients`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPatients(res.data);
    };

    fetchPatients();
  }, [token]);

  useEffect(() => {
    if (!selectedPatientId) return;

    const fetchRecords = async () => {
      const res = await axios.get(`${baseURL}/api/records/${selectedPatientId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRecords(res.data);
    };

    fetchRecords();
  }, [selectedPatientId, token]);

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        patient_id: selectedPatientId,
        created_by: user_id
      };

      if (editing) {
        await axios.put(`${baseURL}/api/records/${editing.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${baseURL}/api/records`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      const res = await axios.get(`${baseURL}/api/records/${selectedPatientId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setRecords(res.data);
      setShowForm(false);
      setEditing(null);
      setFormData({ diagnosis: '', treatment: '', notes: '' });
    } catch (err) {
      console.error("Failed to save record:", err.message);
    }
  };

  const handleEdit = (record) => {
    setEditing(record);
    setFormData({
      diagnosis: record.diagnosis,
      treatment: record.treatment,
      notes: record.notes
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${baseURL}/api/records/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const res = await axios.get(`${baseURL}/api/records/${selectedPatientId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setRecords(res.data);
  };

   if (!token || !role) {
    navigate('/login');
    return null;
  }

  return (
    <Container className="mt-4">
      <h3>Medical Records</h3>

      <Form.Group className="mb-3">
        <Form.Label>Select Patient</Form.Label>
        <Form.Select
          value={selectedPatientId}
          onChange={(e) => setSelectedPatientId(e.target.value)}
        >
          <option value="">-- Select Patient --</option>
          {patients.map(p => (
            <option key={p.patient_id} value={p.patient_id}>
              {p.full_name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {role === 'doctor' && selectedPatientId && (
        <Button className="mb-3" onClick={() => setShowForm(true)}>
          Add Record
        </Button>
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Diagnosis</th>
            <th>Treatment</th>
            <th>Notes</th>
            {role === 'doctor' && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td>{r.diagnosis}</td>
              <td>{r.treatment}</td>
              <td>{r.notes}</td>
              {role === 'doctor' && (
                <td>
                  <Button size="sm" variant="info" onClick={() => handleEdit(r)}>Edit</Button>{' '}
                  <Button size="sm" variant="danger" onClick={() => handleDelete(r.id)}>Delete</Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? 'Edit' : 'Add'} Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Diagnosis</Form.Label>
              <Form.Control
                type="text"
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Treatment</Form.Label>
              <Form.Control
                type="text"
                name="treatment"
                value={formData.treatment}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowForm(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editing ? 'Update' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Records;
