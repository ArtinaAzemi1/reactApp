import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditDepartment(props) {
  const [department, setDepartment] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [controlDepartment, setControlDepartment] = useState(false);
  const [confirmDepartment, setConfirmDepartment] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [fushatEZbrazura, setFushatEZbrazura] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const departmentsResponse = await axios.get('https://localhost:7214/api/Department/${props.departmentId}');
        setDepartment(departmentsResponse.data);
      } catch (err) {
        console.error('Error fetching departments:', err);
      }
    };

    fetchDepartments();
  }, [props.departmentId]);

  const handleInputChange = (field, value) => {
    setDepartment((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    await axios.put(`https://localhost:7214/api/Department/` + props.departmentId, {
            departmentName: department.departmentName,
            deanName: department.deanName,
            stafCount: department.stafCount
      })
        .then(x => {
          toast.success('Department has been updated!');
          props.perditesoTeDhenat();
          props.hide();
        })
        .catch(error => {
          toast.error('Failed to update Department');
          console.error('Error saving the Department:', error);
          props.perditesoTeDhenat();
        });
    
  //  try {
  //    await axios.put(`https://localhost:7214/api/Student/${props.studentId}`, student);
  //    toast.success('Student has been updated!');
  //    props.hide();
  //    props.perditesoTeDhenat();
  //  } catch (error) {
  //    console.error('Error saving the student:', error);
  //    toast.error('Failed to update student');
  //  }
  };

  /*const handleControl = () => {
    if (student.departmentId === "" || student.departmentId === null) {
      setControlStudent(true);
    } else {
      handleSubmit();
    }
  };*/
  /*const handleControl = () => {
    if (!student.departmentId) {
      setShowConfirmation(true);
    } else {
      handleSubmit();
    }
  };*/

  const isNullOrEmpty = (value) => {
    return !value || value.trim() === '';
  };

  const handleControl = () => {
        if (confirmDepartment == false && departments.filter((item) => item.departmentName === department.departmentName).length !== 0) {
            setControlDepartment(true);
        }
        else {
            handleSubmit();
        }
    }
 


  return (
    <>
      {controlDepartment && (
        <Modal size="sm" show={controlDepartment} onHide={() => setControlDepartment(false)}>
          <Modal.Header closeButton>
            <Modal.Title as="h6">Confirm input</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span style={{ fontSize: "10pt" }}>A department with this name exists!</span>
            <br />
            <strong style={{ fontSize: "10pt" }}>Are you sure you want to continue?</strong>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={() => setControlDepartment(false)}>
              Correct <FontAwesomeIcon icon={faXmark} />
            </Button>
            <Button size="sm" variant="warning" onClick={handleSubmit}>
              Go on
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <Modal className="modalEditShto" show={props.show} onHide={props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="Name">
              <Form.Label>Department Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name..."
                value={department.departmentName || ''}
                onChange={(e) => handleInputChange('departmentName', e.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group controlId="Surname">
              <Form.Label>Department Dean</Form.Label>
              <Form.Control
                type="text"
                placeholder="Dean Name..."
                value={department.deanName || ''}
                onChange={(e) => handleInputChange('deanName', e.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group controlId="BirthDate">
              <Form.Label>Staf Count</Form.Label>
              <Form.Control
                type="number"
                value={department.stafCount || ''}
                onChange={(e) => handleInputChange('stafCount', e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.hide}>Cancel</Button>
          <Button onClick={handleControl}>Edit Department</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default EditDepartment;