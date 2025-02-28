import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditPlayer(props) {
  const [player, setPlayer] = useState({});
  const [teams, setTeams] = useState([]);
  const [controlPlayer, setControlPlayer] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch student details
        const playersResponse = await axios.get(`https://localhost:7214/api/Player/${props.playerId}`);
        setPlayer(playersResponse.data);

        
        const teamsResponse = await axios.get('https://localhost:7214/api/Team');
        setTeams(teamsResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [props.playerId]);

  const handleInputChange = (field, value) => {
    setPlayer((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    await axios.put(`https://localhost:7214/api/Player/` + props.playerId, {
            name: player.name,
            number: player.number,
            birthYear: player.birthYear,
            teamId: player.teamId
      })
        .then(x => {
          toast.success('Player has been updated!');
          props.perditesoTeDhenat();
          props.hide();
        })
        .catch(error => {
          toast.error('Failed to update player');
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
    if (!player.teamId) {
      setShowConfirmation(true);
    } else {
      handleSubmit();
    }
  };

  const handleTeam = (value) => {
    setPlayer((prev) => ({ ...prev, teamId: value }));
  };

  return (
    <>
      {controlPlayer && (
        <Modal size="sm" show={controlPlayer} onHide={() => setControlPlayer(false)}>
          <Modal.Header closeButton>
            <Modal.Title as="h6">Confirm input</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span style={{ fontSize: "10pt" }}>A player with this name exists!</span>
            <br />
            <strong style={{ fontSize: "10pt" }}>Are you sure you want to continue?</strong>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={() => setControlPlayer(false)}>
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
          <Modal.Title>Edit Player</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="Name">
              <Form.Label>Player Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name..."
                value={player.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group controlId="Surname">
              <Form.Label>Player Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Surname..."
                value={player.number || ''}
                onChange={(e) => handleInputChange('number', e.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group controlId="BirthDate">
              <Form.Label>Student Date of Birth</Form.Label>
              <Form.Control
                type="date"
                value={player.birthYear?.split('T')[0] || ''}
                onChange={(e) => handleInputChange('birthYear', e.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group className="mb-3" controlId="Department">
              <Form.Label>Team<span style={{ color: "red" }}>*</span></Form.Label>
              <select
                className="form-select"
                value={player.teamId || ''}
                onChange={(e) => handleTeam(e.target.value)}
              >
                <option defaultValue disabled value="">Team</option>
                {teams.map((item) => (
                  <option key={item.teamId} value={item.teamId}>
                    {item.teamName}
                  </option>
                ))}
              </select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.hide}>Cancel</Button>
          <Button onClick={handleControl}>Edit Team</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default EditPlayer;




/*import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


function EditStudent(props) {
  const [student, setStudent] = useState([]);
  const [foto, setFoto] = useState(null);
  const [departments, setDepartments] = useState([]);

  const [refreshD, setRefreshD] = useState("");
  const [students, setStudents] = useState([]);
  const [controlStudent, setControlStudent] = useState(false);
  const [confirmStudent, setConfirmStudent] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);

  /*useEffect(() => {
    const getStudents = async () => {
      try {
        const students = await axios.get(
          `https://localhost:7214/api/Student`
        );
        setStudents(students.data);

      } catch (err) {
        console.log(err);
      }
    };

    getStudents();
  }, [refreshD]);*/

  /*const getToken = localStorage.getItem("token");

  const authentikimi = {
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  };*/

 /* useEffect(() => {
    const showStudents = async () => {
      try {
        const student = await axios.get(`https://localhost:7214/api/Student/` + props.studentId);
        setStudent(student.data);

      } catch (err) {
        console.log(err);
      }
    };
    Promise.all([
      fetch("https://localhost:7214/api/Department")
    ])
      .then((resDepartment) =>
        Promise.all(resDepartment.json())
      )
      .then((dataDepartment) => {
        setDepartments(dataDepartment);
      });

    showStudents();
  }, []);*/

  /*useEffect(() => {
    const fetchStudentAndDepartments = async () => {
      try {
        // Fetch student details
        const studentResponse = await axios.get(`https://localhost:7214/api/Student/${props.studentId}`);
        setStudent(studentResponse.data);

        // Fetch department list
        const departmentsResponse = await axios.get('https://localhost:7214/api/Department');
        setDepartments(departmentsResponse.data);
      } catch (err) {
        console.error('Error fetching student or departments:', err);
      }
    };

    fetchStudentAndDepartments();
  }, [props.studentId]);

  const handleName = (value) => {
    setStudent((prev) => ({ ...prev, name: value }));
  };

  const handleSurname = (value) => {
    setStudent((prev) => ({ ...prev, surname: value }));
  };
  const handleBirthDate = (value) => {
    setStudent((prev) => ({ ...prev, birthDate: value }));
  };
  const handleGender = (value) => {
    setStudent((prev) => ({ ...prev, gender: value }));
  };
  const handleCity = (value) => {
    setStudent((prev) => ({ ...prev, city: value }));
  };
  const handleEmail = (value) => {
    setStudent((prev) => ({ ...prev, email: value }));
  };
  const handleDepartment = (value) => {
    setStudent((prev) => ({ ...prev, departmentId: value }));
  };

  

  function isNullOrEmpty(value) {
    return value === null || value === "" || value === undefined;
  }

  async function handleSubmit() {
      try {
            await axios.put(`https://localhost:7214/api/Student/` + props.studentId, {
                name: student.name,
                surname: student.surname,
                birthDate: student.birthDate,
                gender: student.gender,
                city: student.city,
                email: student.email,
                photo: student.photo,
                departmentId: student.departmentId
            })
              
                toast.success('Student has been updated !');
                props.hide();
                setRefreshD(prev => !prev);
      } catch (error) {
        console.error('Error saving the product:', error);
                toast.error('Failed to update student');
        console.error(error);
  }}

  const handleControl = () => {
    if (
      isNullOrEmpty(student.departmentName)
    ) {
      if (confirmStudent == false && students.filter((item) => item.name === student.name).length !== 0) {
        setControlStudent(true);
      }
      else {
        handleSubmit();
    }}}

  return (
    <>
      {controlStudent &&
        <Modal size="sm" show={controlStudent} onHide={() => setControlStudent(false)}>
          <Modal.Header closeButton>
            <Modal.Title as="h6">Confirm input</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span style={{ fontSize: "10pt" }}>
              A student with this name exists !
            </span>
            <br />
            <strong style={{ fontSize: "10pt" }}>
              Are you sure you want to continue ?
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
              Go on
            </Button>
          </Modal.Footer>
        </Modal>
      }
      <Modal className="modalEditShto"
            show={props.show}
            onHide={props.hide}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Student</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId = "Name">
                  <Form.Label>Student Name</Form.Label>
                  <Form.Control type="text" name="Name" required placeholder="Name..."
                  value={student.name} onChange={(e)=> handleName(e.target.value)}>
                  </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId = "ProfessorSurname">
                    <Form.Label>Student Surname</Form.Label>
                    <Form.Control type="text" name="ProfessorSurname" required placeholder="Surname..."
                     value={student.surname} onChange={(e)=> handleSurname(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId = "ProfessorBirthdate">
                    <Form.Label>Student Date of Birth</Form.Label>
                    <Form.Control type="date" name="StudentBirthdate" required placeholder="Birthdate..."
                     value={student.birthDate} onChange={(e)=> handleBirthDate(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId="ProfessorGender">
                  <Form.Label>Student Gender</Form.Label>
                  <Form.Select
                        value={student.gender} 
                         onChange={(e)=> handleGender(e.target.value)}
                        required
                    >
                        <option value="" hidden disabled>Select Gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </Form.Select>
                </Form.Group>
                <br/>
                <Form.Group controlId = "ProfessorCity">
                    <Form.Label>Student City</Form.Label>
                    <Form.Control type="text" name="ProfessorCity" required placeholder="City..."
                    value={student.city} onChange={(e)=> handleCity(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId = "ProfessorEmail">
                    <Form.Label>Student Email</Form.Label>
                    <Form.Control type="text" name="ProfessorEmail" required placeholder="Email..."
                     value={student.email} onChange={(e)=> handleEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Department<span style={{ color: "red" }}>*</span></Form.Label>
                  <select
                    placeholder="Department..."
                    className="form-select"
                    value={student.departmentId}
                    onChange={(e) => handleDepartment(e.target.value)}
                  >
                    <option defaultValue disabled value="">
                      Department
                    </option>
                    {departments.map((item) => {
                      return (
                        <option key={item.departmentId} value={item.departmentId}>{item.departmentName}</option>
                      );
                    })}
                  </select>
                </Form.Group>     
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.hide}>
                Cancel 
              </Button>
              <Button
                onClick={handleControl}>
                Edit Student 
              </Button>
            </Modal.Footer>
          </Modal>
    </>
  )
}

export default EditStudent;*/