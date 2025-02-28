import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const EditLocation = ({ isOpen, toggle, locationId, fetchLocations }) => {
  const [location, setLocation] = useState({
    address: '',
    city: ''
  });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(`https://localhost:7028/api/Location/${locationId}`);
        setLocation(response.data);
      } catch (error) {
        console.error('Error fetching location!', error);
      }
    };

    if (locationId) {
      fetchLocation();
    }
  }, [locationId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocation({ ...location, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:7028/api/Location/${locationId}`, location);
      fetchLocations(); // Refresh list of locations
      toggle(); // Close modal
      toast.success("Location updated successfully!")
    } catch (error) {
      console.error('Error updating location!', error);
      toast.error("Failed to update location.")
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Location</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input
              type="text"
              name="address"
              id="address"
              value={location.address}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="city">City</Label>
            <Input
              type="text"
              name="city"
              id="city"
              value={location.city}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <ModalFooter>
            <Button color="primary" type="submit">Update Location</Button>
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default EditLocation;