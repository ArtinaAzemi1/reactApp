import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShtoHall = (props) => {
  const { fetchHalls } = props;
  const [hallCode, setHallCode] = useState('')
  const [type, setType] = useState('')
  const [hallCapacity, setHallCapacity] = useState(0)
  const [locations, setLocations] = useState([]);
  const [locationId, setLocationId] = useState("");
  const [addressL, setAddressL] = useState("");
  const [cityL, setCityL] = useState("");

  const [halls, setHalls] = useState([]);
  const [refreshD, setRefreshD] = useState("");

  const [fushatEZbrazura, setFushatEZbrazura] = useState(false);
  const [controlHall, setControlHall] = useState(false);
  const [confirmHall, setConfirmHall] = useState(false);

  // Fetch students and departments on component mount or refresh
  /*useEffect(() => {
    const fetchData = async () => {
      try {
        const hallsResponse = await axios.get("https://localhost:7028/api/Hall");
        setHalls(hallsResponse.data);

        const locationsResponse = await axios.get('https://localhost:7028/api/Location');
        setLocationsD(locationsResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [refreshD]);*/

  useEffect(() => {
    const postHalls = async () => {
      try {
        const halls = await axios.get("https://localhost:7028/api/Hall");
        setHalls(halls.data);

      } catch (err) {
        console.log(err);
      }
    };

    postHalls();
  }, [refreshD]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationsResponse = await axios.get('https://localhost:7028/api/Location');
        setLocations(locationsResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  
  const handleHallCodePChange = (value) => {
    setHallCode(value);
  };

  const handleTypeChange = (value) => {
    setType(value);
  };

  const handleHallCapacityChange = (value) => {
    setHallCapacity(value);
  };

  const handleLocationChange = (value) => {
    setLocationId(value);
  };

  /*const handleSubmit = async () => {
    try {
      await axios.post("https://localhost:7028/api/Hall", {
        hallCode: hallCode,
        type: type,
        hallCapacity: hallCapacity,
        locationId: locationId
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      toast.success('Hall has been added!');
      //fetchHalls();
      props.perditesoTeDhenat();
      props.hide();
    } catch (error) {
      console.error(error);
      toast.error('Failed to add hall');
    }
  };*/

  const handleSubmit = async () => {

    if (!locationId) {
      alert("Please select a location.");
      return;
    }
    const requestData = {
      hallCapacity: hallCapacity,
    hallCode: hallCode,
    locationId: locationId,  // Sigurohuni që locationId është i vlefshëm
    type: type
    };
    console.log("Submitting  with locationId:", locationId);
  
    try {
      const response = await axios.post("https://localhost:7028/api/Hall", requestData);
      console.log('Hall added successfully:', response.data);
      toast.success('Hall has been added!');
      fetchHalls();
      props.perditesoTeDhenat();
      props.hide();
    } catch (error) {
      console.log('Error response:', error.response);
      if (error.response && error.response.data && error.response.data.errors) {
        console.log('Validation errors:', error.response.data.errors);
      }
      toast.error(error.response?.data.title || 'Failed to add hall');
    }
  };

  function isNullOrEmpty(value) {
    return value === null || value === "" || value === undefined;
  }

  const handleControl = (e) => {
    e.preventDefault();
    if (
      isNullOrEmpty(hallCode) || isNullOrEmpty(locationId)
      
    ) {
      setFushatEZbrazura(true);
    } else {
      if (!confirmHall && halls.some((hall) => hall.hallCode === hallCode)) {
        setControlHall(true);
      } else {
        handleSubmit();
      }
    }
  }

  /*const handleControl = (e) => {
    e.preventDefault();

    if (
      !hallCode || !type || !hallCapacity || !locationId
    ) {
      setFushatEZbrazura(true);
    } else if (!controlHall && halls.some((hall) => hall.hallCode === hallCode)) {
      setControlHall(true);
    } else {
      handleSubmit();
    }
  };*/

  return (
    <>
      {fushatEZbrazura &&
        <Modal size="sm" show={fushatEZbrazura} onHide={() => setFushatEZbrazura(false)}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "red" }} as="h6">There's been a mistake...</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <strong style={{ fontSize: "10pt" }}>Please fill all the required fields!!</strong>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" onClick={() => setFushatEZbrazura(false)} variant="secondary">
              Close <FontAwesomeIcon icon={faXmark} />
            </Button >
          </Modal.Footer>
        </Modal>
      }
      {controlHall &&
        <Modal size="sm" show={controlHall} onHide={() => setControlHall(false)}>
          <Modal.Header closeButton>
            <Modal.Title as="h6">Confirm input</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span style={{ fontSize: "10pt" }}>
              A hall with the same code happens to be on the system!
            </span>
            <br />
            <strong style={{ fontSize: "10pt" }}>
              Are you sure you want to continue?
            </strong>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={() => setControlHall(true)}>
              Correct <FontAwesomeIcon icon={faXmark} />
            </Button>
            <Button
              size="sm"
              variant="warning"
              onClick={() => { handleSubmit(); }}
            >
              Continue
            </Button>
          </Modal.Footer>
        </Modal>
      }
      <Modal className="modalEditShto" show={props.show} onHide={props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Add Hall</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleControl}>
            <Form.Group className="mb-3" controlId="hallCode">
              <Form.Label>Hall Code<span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control
                onChange={(e) => handleHallCodePChange(e.target.value)}
                value={hallCode}
                type="text"
                placeholder="Hall Code..."
                autoFocus
              />
            </Form.Group>
            <Form.Group controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type..."
                value={type}
                onChange={(e) => handleTypeChange(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="Capacity">
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Capacity..."
                value={hallCapacity}
                onChange={(e) => handleHallCapacityChange(Number(e.target.value))}
              />
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label>Location<span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Select
                value={locationId}
                className="form-select"
                onChange={(e) => handleLocationChange(e.target.value)}
              >
                <option defaultValue disabled value="" hidden>Select Location</option>
                {locations.map((item) => (
                  <option key={item.locationId} value={item.locationId}>{item.address} - {item.city}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={handleControl}>
                Add New Hall
              </Button>
          <Button variant="danger" onClick={props.hide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ShtoHall;