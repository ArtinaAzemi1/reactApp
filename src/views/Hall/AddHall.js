import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const AddHall = ({ isOpen, toggle, fetchHalls }) => {
  // States for form data and fetched locations
  const [hallCode, setHallCode] = useState('');
  const [type, setType] = useState('');
  const [hallCapacity, setHallCapacity] = useState(0);
  const [locationId, setLocationId] = useState('');
  const [locations, setLocations] = useState([]);

  // Fetch location data on component mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('https://localhost:7028/api/Location');
        if (!response.ok) throw new Error('Failed to fetch locations');
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLocations();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'hallCode':
        setHallCode(value);
        break;
      case 'type':
        setType(value);
        break;
      case 'hallCapacity':
        setHallCapacity(value);
        break;
      case 'locationId':
        setLocationId(value);
        break;
      default:
        break;
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    
  
    if (!locationId) {
      console.log("Location is required");
      return; // Ndaloni dërgimin nëse nuk është zgjedhur asnjë lokacion
    }
  
    const hall = {
      hallCode: hallCode,
      type: type,
      hallCapacity: hallCapacity,
      locationId: locationId,
    };
  
    try {
      const response = await fetch('https://localhost:7028/api/Hall', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hall),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add hall');
      }
  
      fetchHalls(); // Refresh list of halls
      toggle(); // Close modal
      resetForm(); // Reset form
    } catch (error) {
      console.error('Error adding hall:', error);
    }
  };

  // Reset form to clear fields
  const resetForm = () => {
    setHallCode('');
    setType('');
    setHallCapacity(0);
    setLocationId('');
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add New Hall</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="hallCode">Hall Code</Label>
            <Input
              type="text"
              name="hallCode"
              id="hallCode"
              value={hallCode}
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
              value={type}
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
              value={hallCapacity}
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
              value={locationId}
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
            <Button color="primary" type="submit">
              Add Hall
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddHall;

/*import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import axios from 'axios';

const AddHall = ({ isOpen, toggle, fetchHalls }) => {
  const [hallCode, setHallCode] = useState('')
  const [type, setType] = useState('')
  const [hallCapacity, setHallCapacity] = useState(0)
  const [locationId, setLocationId] = useState('');

  const [hall, setHall] = useState({
    hallCode: hallCode,
    type: type,
    hallCapacity: hallCapacity,
    locationId: locationId
  });

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('https://localhost:7028/api/Location');
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations!', error);
      }
    };

    fetchLocations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHall({ ...hall, [name]: value });
  };

  const handleSubmit = async () => {
    
    try {
      const response = await fetch('https://localhost:7028/api/Hall', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hall),
      });

      if (!response.ok) {
        throw new Error('Failed to add hall');
      }

      fetchHalls(); // Refresh list of halls
      toggle(); // Close modal
      setHall({
        hallCode: '',
        type: '',
        hallCapacity: 0,
        locationId: '',
      }); // Reset form
    } catch (error) {
      console.error('Error adding hall!', error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>Add New Hall</ModalHeader>
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
            <Button color="primary" type="submit">Add Hall</Button>
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddHall;*/