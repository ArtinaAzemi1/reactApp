import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditProfessor(props) {
  const [professor, setProfessor] = useState({});
  const [departments, setDepartments] = useState([]);
  const [controlProfessor, setControlProfessor] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchProfesorAndDepartments = async () => {
      try {
        // Fetch student details
        const professorResponse = await axios.get(`https://localhost:7214/api/Professor/${props.professorId}`);
        setProfessor(professorResponse.data);

        // Fetch department list
        const departmentsResponse = await axios.get('https://localhost:7214/api/Department');
        setDepartments(departmentsResponse.data);
      } catch (err) {
        console.error('Error fetching professor or departments:', err);
      }
    };

    fetchProfesorAndDepartments();
  }, [props.professorId]);

  const handleInputChange = (field, value) => {
    setProfessor((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`https://localhost:7214/api/Professor/${props.professorId}`, professor);
      toast.success('Professor has been updated!');
      props.hide();
      props.perditesoTeDhenat();
    } catch (error) {
      console.error('Error saving the professor:', error);
      toast.error('Failed to update professor');
    }
  };

  /*const handleControl = () => {
    if (student.departmentId === "" || student.departmentId === null) {
      setControlStudent(true);
    } else {
      handleSubmit();
    }
  };*/
  const handleControl = () => {
    if (!professor.departmentId) {
      setShowConfirmation(true);
    } else {
      handleSubmit();
    }
  };

  const handleDepartment = (value) => {
    setProfessor((prev) => ({ ...prev, departmentId: value }));
  };

  return (
    <>
    <ToastContainer />
      {controlProfessor && (
        <Modal size="sm" show={controlProfessor} onHide={() => setControlProfessor(false)}>
          <Modal.Header closeButton>
            <Modal.Title as="h6">Confirm input</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span style={{ fontSize: "10pt" }}>A student with this name exists!</span>
            <br />
            <strong style={{ fontSize: "10pt" }}>Are you sure you want to continue?</strong>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={() => setControlProfessor(false)}>
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
          <Modal.Title>Edit Professor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="Name">
              <Form.Label>Professor Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name..."
                value={professor.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group controlId="Surname">
              <Form.Label>Professor Surname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Surname..."
                value={professor.surname || ''}
                onChange={(e) => handleInputChange('surname', e.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group controlId="BirthDate">
              <Form.Label>Professor Date of Birth</Form.Label>
              <Form.Control
                type="date"
                value={professor.birthDate?.split('T')[0] || ''}
                onChange={(e) => handleInputChange('birthDate', e.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group controlId="Gender">
              <Form.Label>Professor Gender</Form.Label>
              <Form.Select
                value={professor.gender || ''}
                onChange={(e) => handleInputChange('gender', e.target.value)}
              >
                <option value="" hidden disabled>Select Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </Form.Select>
            </Form.Group>
            <br />
            <Form.Group controlId="City">
              <Form.Label>Professor City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City..."
                value={professor.city || ''}
                onChange={(e) => handleInputChange('city', e.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group controlId="Email">
              <Form.Label>Professor Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email..."
                value={professor.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group className="mb-3" controlId="Department">
              <Form.Label>Department<span style={{ color: "red" }}>*</span></Form.Label>
              <select
                className="form-select"
                value={professor.departmentId || ''}
                onChange={(e) => handleDepartment(e.target.value)}
              >
                <option defaultValue disabled value="">Department</option>
                {departments.map((item) => (
                  <option key={item.departmentId} value={item.departmentId}>
                    {item.departmentName}
                  </option>
                ))}
              </select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.hide}>Cancel</Button>
          <Button onClick={handleControl}>Edit Professor</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProfessor;