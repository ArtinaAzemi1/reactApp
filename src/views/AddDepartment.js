import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddDepartment = (props) => {
  const [departmentName, setDepartmentName] = useState('');
  const [deanName, setDeanName] = useState('');
  const [stafCount, setStafCount] = useState(0);
  const [departments, setDepartmentsD] = useState([]);
  const [refreshD, setRefreshD] = useState("");

  const [fushatEZbrazura, setFushatEZbrazura] = useState(false);
  const [controlStudent, setControlStudent] = useState(false);

  // Fetch students and departments on component mount or refresh
  useEffect(() => {
    const fetchData = async () => {
      try {
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
      await axios.post("https://localhost:7214/api/Department", {
        departmentName,
        deanName,
        stafCount
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      toast.success('Department has been added!');
      props.perditesoTeDhenat();
      props.hide();
    } catch (error) {
      console.error(error);
      toast.error('Failed to add department');
    }
  };

  const handleControl = (e) => {
    e.preventDefault();

    if (
      !departmentName || !deanName || !stafCount
    ) {
      setFushatEZbrazura(true);
    } else if (!controlStudent && departments.some((department) => department.departmentName === departmentName)) {
      setControlStudent(true);
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
      {controlStudent &&
        <Modal size="sm" show={controlStudent} onHide={() => setControlStudent(false)}>
          <Modal.Header closeButton>
            <Modal.Title as="h6">Confirm input</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span style={{ fontSize: "10pt" }}>
              A department with the same name happens to be on the system!
            </span>
            <br />
            <strong style={{ fontSize: "10pt" }}>
              Are you sure you want to continue?
            </strong>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={() => setControlStudent(false)}>
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
          <Modal.Title>Add Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleControl}>
            <Form.Group className="mb-3" controlId="studentName">
              <Form.Label>Department Name<span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control
                onChange={(e) => setDepartmentName(e.target.value)}
                value={departmentName}
                type="text"
                placeholder="Name..."
                autoFocus
              />
            </Form.Group>
            <Form.Group controlId="studentSurname">
              <Form.Label>Department Dean Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Dean Name..."
                value={deanName}
                onChange={(e) => setDeanName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="studentBirthdate">
              <Form.Label>Staff Count</Form.Label>
              <Form.Control
                type="text"
                placeholder="Staf Count..."
                value={stafCount}
                onChange={(e) => setStafCount(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Button variant="info" type="submit">
                Add New Department
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

export default AddDepartment;