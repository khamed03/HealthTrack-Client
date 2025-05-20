import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const AddMedicalRecord = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: '',
    diagnosis: '',
    treatment: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You’ll replace this with an actual POST request to the backend
    console.log('Submitting record:', { ...formData, patientId });

    // Redirect to records page after submission
    navigate(`/records/${patientId}`);
  };

  return (
    <Container>
      <Card className="p-4 mt-4 shadow-sm">
        <h4 className="mb-4">Add New Medical Record</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Diagnosis</Form.Label>
            <Form.Control
              type="text"
              name="diagnosis"
              placeholder="e.g. Type 2 Diabetes"
              value={formData.diagnosis}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Treatment</Form.Label>
            <Form.Control
              type="text"
              name="treatment"
              placeholder="e.g. Metformin 500mg"
              value={formData.treatment}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
            />
          </Form.Group>

          <Button type="submit" variant="primary">Save Record</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AddMedicalRecord;
