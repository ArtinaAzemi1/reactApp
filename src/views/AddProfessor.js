import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddStudent = (props) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');
  const [departments, setDepartmentsD] = useState([]);
  const [departmentId, setDepartmentId] = useState('');

  const [professors, setProfessors] = useState([]);
  const [refreshD, setRefreshD] = useState("");

  const [fushatEZbrazura, setFushatEZbrazura] = useState(false);
  const [controlProfessor, setControlProfessor] = useState(false);

  // Fetch students and departments on component mount or refresh
  useEffect(() => {
    const fetchData = async () => {
      try {
        const professorsResponse = await axios.get("https://localhost:7214/api/Professor");
        setProfessors(professorsResponse.data);

        const departmentsResponse = await axios.get('https://localhost:7214/api/Department');
        setDepartmentsD(departmentsResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [refreshD]);

  const handleSubmit = async () => {
    try {
      await axios.post("https://localhost:7214/api/Professor", {
        name,
        surname,
        birthDate: birthDate ? new Date(birthDate).toISOString() : null,
        gender,
        city,
        email,
        photo,
        departmentId
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      toast.success('Professor has been added!');
      props.perditesoTeDhenat();
      props.hide();
    } catch (error) {
      console.error(error);
      toast.error('Failed to add professor');
    }
  };

  const handleControl = (e) => {
    e.preventDefault();

    if (
      !name || !surname || !birthDate || !gender || !city || !email || !departmentId
    ) {
      setFushatEZbrazura(true);
    } else if (!controlProfessor && professors.some((professor) => professor.name === name)) {
      setControlProfessor(true);
    } else {
      handleSubmit();
    }
  };

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
      {controlProfessor &&
        <Modal size="sm" show={controlProfessor} onHide={() => setControlProfessor(false)}>
          <Modal.Header closeButton>
            <Modal.Title as="h6">Confirm input</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span style={{ fontSize: "10pt" }}>
              A professor with the same name happens to be on the system!
            </span>
            <br />
            <strong style={{ fontSize: "10pt" }}>
              Are you sure you want to continue?
            </strong>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={() => setControlProfessor(false)}>
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
          <Modal.Title>Add Professor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleControl}>
            <Form.Group className="mb-3" controlId="studentName">
              <Form.Label>Professor Name<span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Name..."
                autoFocus
              />
            </Form.Group>
            <Form.Group controlId="studentSurname">
              <Form.Label>Professor Surname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Surname..."
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="studentBirthdate">
              <Form.Label>Professor Date of Birth</Form.Label>
              <Form.Control
                type="date"
                placeholder="Birthdate..."
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="studentGender">
              <Form.Label>Professor Gender</Form.Label>
              <Form.Select 
                value={gender}
                onChange={(e) => setGender(e.target.value)} 
                required
              >
                <option value="" hidden>Select Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                {/* Add more options if needed */}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="studentCity">
              <Form.Label>Professor City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="studentEmail">
              <Form.Label>Professor Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="studentDepartment">
              <Form.Label>Department<span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Select
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                required
              >
                <option value="" hidden>Select Department</option>
                {departments.map((item) => (
                  <option key={item.departmentId} value={item.departmentId}>{item.departmentName}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Button variant="info" type="submit">
                Add New Professor
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.hide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default AddStudent;