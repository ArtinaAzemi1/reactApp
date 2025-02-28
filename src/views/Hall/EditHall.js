import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

const EditHall = ({ isOpen, toggle, hallId, fetchHalls }) => {
  const [hall, setHall] = useState({
    hallCode: '',
    type: '',
    hallCapacity: '',
    locationId: ''
  });

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchHall = async () => {
      try {
        const response = await axios.get(`https://localhost:7028/api/Hall/${hallId}`);
        setHall(response.data);
      } catch (error) {
        console.error('Error fetching hall!', error);
      }
    };

    const fetchLocations = async () => {
      try {
        const response = await axios.get('https://localhost:7028/api/Location');
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations!', error);
      }
    };

    fetchLocations();
    if (hallId) {
      fetchHall();
    }
  }, [hallId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHall({ ...hall, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:7028/api/Hall/${hallId}`, hall);
      fetchHalls(); // Refresh list of halls
      toggle(); // Close modal
    } catch (error) {
      console.error('Error updating hall!', error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Hall</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="hallCode">Hall Code</Label>
            <Input
              type="text"
              name="hallCode"
              id="hallCode"
              value={hall.hallCode}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="type">Type</Label>
            <Input
              type="text"
              name="type"
              id="type"
              value={hall.type}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="hallCapacity">Capacity</Label>
            <Input
              type="number"
              name="hallCapacity"
              id="hallCapacity"
              value={hall.hallCapacity}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="locationId">Location</Label>
            <Input
              type="select"
              name="locationId"
              id="locationId"
              value={hall.locationId}
              onChange={handleChange}
              required
            >
              <option value="">Select Location</option>
              {locations.map((location) => (
                <option key={location.locationId} value={location.locationId}>
                  {location.address}, {location.city}
                </option>
              ))}
            </Input>
          </FormGroup>
          <ModalFooter>
            <Button color="primary" type="submit">Update Hall</Button>
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default EditHall;