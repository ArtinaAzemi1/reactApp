import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const AddLocation = ({ isOpen, toggle, fetchLocations }) => {
  const [location, setLocation] = useState({
    address: '',
    city: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocation({ ...location, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:7028/api/Location', location);
      fetchLocations(); // Refresh list of locations
      toggle(); // Close modal
      toast.success("Location added succesfully!");
    } catch (error) {
      console.error('Error adding location!', error);
      toast.error("Failed to add location.");
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Location</ModalHeader>
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
            <Button color="primary" type="submit">Add Location</Button>
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddLocation;