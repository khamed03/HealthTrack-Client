import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Container } from 'react-bootstrap';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const MedicalRecords = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [formData, setFormData] = useState({ date: '', diagnosis: '', treatment: '', notes: '' });

  const baseURL = 'http://localhost:5000';

  // const fetchPatients = async () => {
  //   const token = await getAccessTokenSilently();
  //   const res = await axios.get(`${baseURL}/api/patients`, {
  //     headers: { Authorization: `Bearer ${token}` }
  //   });
  //   setPatients(res.data);
  // };

  const fetchRecords = async () => {
    if (!selectedPatientId) return;
    const token = await getAccessTokenSilently();
    const res = await axios.get(`${baseURL}/api/records/${selectedPatientId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setRecords(res.data);
  };

  useEffect(() => {
  const fetchPatients = async () => {
    const token = await getAccessTokenSilently();
    const res = await axios.get(`${baseURL}/api/patients`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setPatients(res.data);
  };

  fetchPatients();
}, [getAccessTokenSilently]);

useEffect(() => {
  if (!selectedPatientId) return;

  const fetchRecords = async () => {
    const token = await getAccessTokenSilently();
    const res = await axios.get(`${baseURL}/api/records/${selectedPatientId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setRecords(res.data);
  };

  fetchRecords();
}, [selectedPatientId, getAccessTokenSilently]);


  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const token = await getAccessTokenSilently();
    const payload = {
      ...formData,
      patient_id: selectedPatientId,
      created_by: user.sub.split('|')[1]
    };

    if (editingRecord) {
      await axios.put(`${baseURL}/api/records/${editingRecord.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } else {
      await axios.post(`${baseURL}/api/records`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }

    setShowForm(false);
    setEditingRecord(null);
    setFormData({ date: '', diagnosis: '', treatment: '', notes: '' });
    fetchRecords();
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setFormData({
      date: record.date?.split('T')[0],
      diagnosis: record.diagnosis,
      treatment: record.treatment,
      notes: record.notes
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const token = await getAccessTokenSilently();
    await axios.delete(`${baseURL}/api/records/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchRecords();
  };

  return (
    <Container className="mt-4">
      <h3>Medical Records</h3>

      <Form.Group className="mb-3">
        <Form.Label>Select Patient</Form.Label>
        <Form.Select
          value={selectedPatientId}
          onChange={(e) => setSelectedPatientId(e.target.value)}
        >
          <option value="">-- Choose Patient --</option>
          {patients.map((p) => (
            <option key={p.patient_id} value={p.patient_id}>
              {p.full_name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {selectedPatientId && (
        <>
          <Button className="mb-3" onClick={() => setShowForm(true)}>
            Add Medical Record
          </Button>

          <Table bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Diagnosis</th>
                <th>Treatment</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id}>
                  <td>{r.date?.split('T')[0]}</td>
                  <td>{r.diagnosis}</td>
                  <td>{r.treatment}</td>
                  <td>{r.notes}</td>
                  <td>
                    <Button size="sm" variant="info" onClick={() => handleEdit(r)}>Edit</Button>{' '}
                    <Button size="sm" variant="danger" onClick={() => handleDelete(r.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingRecord ? 'Edit' : 'Add'} Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
              <Form.Label>Diagnosis</Form.Label>
              <Form.Control
                type="text"
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Treatment</Form.Label>
              <Form.Control
                type="text"
                name="treatment"
                value={formData.treatment}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editingRecord ? 'Update' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MedicalRecords;
