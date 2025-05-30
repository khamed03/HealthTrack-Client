import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Modal, Container } from 'react-bootstrap';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

// 🔐 Role helper
const getUserRole = (user) => {
  if (!user) return null;
  if (user.email.includes('doctor')) return 'doctor';
  if (user.email.includes('secretary')) return 'secretary';
  return 'guest';
};

const ManagePatients = () => {
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const role = getUserRole(user);

  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [formData, setFormData] = useState({
    full_name: '',
    dob: '',
    gender: ''
  });

  const baseURL = 'http://localhost:5000';


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

  
  if (!isAuthenticated || role !== 'secretary') {
    return <h3 className="text-danger text-center mt-5">Unauthorized</h3>;
  }

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const token = await getAccessTokenSilently();
    const payload = {
      ...formData,
      created_by: user.sub.split('|')[1]
    };

    if (editingPatient) {
      await axios.put(`${baseURL}/api/patients/${editingPatient.patient_id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } else {
      await axios.post(`${baseURL}/api/patients`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }

    setShowForm(false);
    setEditingPatient(null);
    setFormData({ full_name: '', dob: '', gender: '' });

    const res = await axios.get(`${baseURL}/api/patients`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setPatients(res.data);
  };

  const handleEdit = (patient) => {
    setEditingPatient(patient);
    setFormData({
      full_name: patient.full_name,
      dob: patient.dob?.split('T')[0],
      gender: patient.gender
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const token = await getAccessTokenSilently();
    await axios.delete(`${baseURL}/api/patients/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const res = await axios.get(`${baseURL}/api/patients`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setPatients(res.data);
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Manage Patients</h3>
      <Button className="mb-3" onClick={() => setShowForm(true)}>
        Add Patient
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.patient_id}>
              <td>{p.full_name}</td>
              <td>{p.dob?.split('T')[0]}</td>
              <td>{p.gender}</td>
              <td>
                <Button size="sm" variant="info" onClick={() => handleEdit(p)}>
                  Edit
                </Button>{' '}
                <Button size="sm" variant="danger" onClick={() => handleDelete(p.patient_id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Form */}
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingPatient ? 'Edit Patient' : 'Add Patient'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <Form.Select name="gender" value={formData.gender} onChange={handleInputChange} required>
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowForm(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editingPatient ? 'Update' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManagePatients;
