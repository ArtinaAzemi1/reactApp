import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditStudent(props) {
  const [student, setStudent] = useState({});
  const [groups, setGroupsD] = useState([]);
  const [controlStudent, setControlStudent] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchStudentAndGroups = async () => {
      try {
        
        const studentResponse = await axios.get(`https://localhost:7110/api/Student/${props.studentId}`);
        setStudent(studentResponse.data);

        
        const groupsResponse = await axios.get('https://localhost:7110/api/Group');
        setGroupsD(groupsResponse.data);
      } catch (err) {
        console.error('Error fetching student or departments:', err);
      }
    };

    fetchStudentAndGroups();
  }, [props.studentId]);

  const handleInputChange = (field, value) => {
    setStudent((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    await axios.put(`https://localhost:7110/api/Student/` + props.studentId )
        .then(x => {
          toast.success('Student has been updated!');
          props.perditesoTeDhenat();
          props.hide();
        })
        .catch(error => {
          toast.error('Failed to update student');
          console.error('Error saving the product:', error);
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
  const handleControl = () => {
    if (!student.groupdId) {
      setShowConfirmation(true);
    } else {
      handleSubmit();
    }
  };

  const handleGroup = (value) => {
    setStudent((prev) => ({ ...prev, groupdId: value }));
  };

  return (
    <>
      {controlStudent && (
        <Modal size="sm" show={controlStudent} onHide={() => setControlStudent(false)}>
          <Modal.Header closeButton>
            <Modal.Title as="h6">Confirm input</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span style={{ fontSize: "10pt" }}>A student with this name exists!</span>
            <br />
            <strong style={{ fontSize: "10pt" }}>Are you sure you want to continue?</strong>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={() => setControlStudent(false)}>
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
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="Name">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name..."
                value={student.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group controlId="Surname">
              <Form.Label>Student Surname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Surname..."
                value={student.surname || ''}
                onChange={(e) => handleInputChange('surname', e.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group controlId="Email">
              <Form.Label>Student Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email..."
                value={student.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group className="mb-3" controlId="Group">
              <Form.Label>Group<span style={{ color: "red" }}>*</span></Form.Label>
              <select
                className="form-select"
                value={student.groupdId || ''}
                onChange={(e) => handleGroup(e.target.value)}
              >
                <option defaultValue disabled value="">Group</option>
                {groups.map((item) => (
                  <option key={item.groupdId} value={item.groupdId}>
                    {item.groupName}
                  </option>
                ))}
              </select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.hide}>Cancel</Button>
          <Button onClick={handleControl}>Edit Student</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default EditStudent;