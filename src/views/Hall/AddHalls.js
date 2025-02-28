import { React, useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBan, faL } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const AddHalls = ({toggle, isOpen}) => {
  const [hallCode, setHallCode] = useState("");
  const [type, setType] = useState("");
  const [hallCapacity, setHallCapacity] = useState(0);
  const [locationId, setLocationId] = useState(0);
  const [addressL, setAddressL] = useState("");
  const [city, setCity] = useState("");

  const [halls, setHalls] = useState([]);
  const [location, setLocation] = useState([]);

  const fetchHalls = async () => {
    try {
      const response = await axios.get('https://localhost:7028/api/Hall');
      setHalls(response.data);
    } catch (error) {
      console.error('Error fetching halls!', error);
    }
  };

  useEffect(() => {
      fetchHalls();
    }, []);

  useEffect(() => {
    const fetchLocations = async () => {
        try {
          const response = await axios.get('https://localhost:7028/api/Location');
          setLocation(response.data);
        } catch (error) {
          console.error('Error fetching locations!', error);
        }
      };

      fetchLocations();
  }, []);

  const handleHallCodeChange = (value) => {
    setHallCode(value);
  };

  const handleTypeChange = (value) => {
    setType(value);
  };

  const handleHallCapacityChange = (value) => {
    setHallCapacity(value);
  };

  const handleLocationChange = (value) => {
    setAddressL(value);
  };


  /*async function handleSubmit(e) {
    e.preventDefault();  // Prevent the form from submitting normally but continue with the axios request
    try {
      await axios.post("https://localhost:7028/api/Hall", {
        hallCode: hallCode,
        type: type,
        hallCapacity: hallCapacity,
        locationId: locationId,  // Make sure to use the correct state for locationId
      });
      fetchHalls();  // Fetch the updated list of halls
      toggle();  // Close the modal after the submission
    } catch (error) {
      console.log("Error:", error);
    }
  }*/
  
    async function handleSubmit() {
    
      await axios
        .post("https://localhost:7028/api/Hall", {
          hallCode: hallCode,
          type: type,
          hallCapacity: hallCapacity,
          locationId: locationId
        })
        .then((response) => {
          fetchHalls();
          toggle();
        })
        .catch((error) => {
          console.log(error);
        });

  }
  
  return (
    <>
    <Modal show={isOpen} onHide={toggle}>
      <Modal.Header closeButton>
        <Modal.Title>Add Hall</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="hallCode">
            <Form.Label>Hall Code <span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="Hall Code"
              value={hallCode}
              onChange={(e) => setHallCode(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="hallCapacity">
            <Form.Label>Capacity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Capacity"
              value={hallCapacity}
              onChange={(e) => setHallCapacity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="locationId">
            <Form.Label>Location <span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control
              as="select"
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
              required
            >
              <option value="">Select Location</option>
              {location.map((item) => (
                <option key={item.locationId} value={item.locationId}>
                  {item.address}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggle}>
              Close <FontAwesomeIcon icon={faXmark} />
            </Button>
            <Button
              type="submit"
              style={{ backgroundColor: "#009879", border: "none" }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
      {/*<Modal isOpen={isOpen} toggle={toggle}>
        <Modal.Header>Add Hall</Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}> 
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Hall Code<span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control
                onChange={(e) => handleHallCodeChange(e.target.value)}
                value={hallCode}
                type="text"
                placeholder="Hall Code"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Type</Form.Label>
              <Form.Control
                onChange={(e) => handleTypeChange(e.target.value)}
                value={type}
                type="text"
                placeholder="Type"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                onChange={(e) => handleHallCapacityChange(e.target.value)}
                type="number"
                value={hallCapacity}
                placeholder="Capacity"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Select Location<span style={{ color: "red" }}>*</span></Form.Label>
              <select
                placeholder="Location"
                className="form-select"
                value={locationId}
                onChange={(e) => handleLocationChange(e.target.value)}
              >
                <option defaultValue disabled value="">
                  Location
                </option>
                {location.map((item) => {
                  return (
                    <option key={item.locationId} value={item.location}>{item.address}, {item.city}</option>
                  );
                })}
              </select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggle}>
            Close <FontAwesomeIcon icon={faXmark} />
          </Button>
          <Button
            style={{ backgroundColor: "#009879", border: "none" }}
            type="submit"
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>*/}
    </>
  );
};

export default AddHalls;