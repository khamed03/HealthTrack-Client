import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const AddMedicalRecord = () => {
  const { patientId } = useParams();
  const { getAccessTokenSilently, user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: '',
    diagnosis: '',
    treatment: '',
    notes: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();

    const newRecord = {
      patient_id: patientId,
      date: formData.date,
      diagnosis: formData.diagnosis,
      treatment: formData.treatment,
      notes: formData.notes,
      created_by: user.sub.split('|')[1] // extract only the user ID part
    };

    try {
      await axios.post('http://localhost:5000/api/records', newRecord, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate(`/records/${patientId}`);
    } catch (err) {
      console.error('Save failed:', err.response?.data || err.message);
      alert('Failed to save record');
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!isAuthenticated) return <p>You must be logged in to add a record.</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" name="date" onChange={handleChange} required />
      <input type="text" name="diagnosis" placeholder="Diagnosis" onChange={handleChange} required />
      <input type="text" name="treatment" placeholder="Treatment" onChange={handleChange} required />
      <textarea name="notes" placeholder="Notes" onChange={handleChange}></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddMedicalRecord;
