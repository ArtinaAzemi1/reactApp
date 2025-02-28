import React, {useState, useEffect, Fragment} from 'react';

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
  } from "reactstrap";

import {Button, Modal, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {ButtonToolbar, Form, Image} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faPenToSquare,
  faUser,
  faPlus,
  faClose,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const Studentt =() => {

    const [show, setShow] = useState(false);

    const [shto, setShto] = useState(false);
    const [edito, setEdito] = useState(false);
    const [fshij, setFshij] = useState(false);
    const [refreshD, setRefreshD] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShto(true);

    const navigate = useNavigate();

    const [studentId, setStudentId] = useState(0);
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [gender, setGender] = useState('')
    const [city, setCity] = useState('')
    const [email, setEmail] = useState('')
    const [photo, setPhoto] = useState('')
    const [studentsD, setStudentsD]= useState([]);
    const [student, setStudent] = useState([]);
    const [departments, setDepartmentsD] = useState([]);
    const [departmentId, setDepartmentId] = useState("");
    const [departmentName, setDepartmentName] = useState("");

  const handleNameChange = (value) => {
    setName(value);
  };
  const handleSurnameChange = (value) => {
    setSurname(value);
  };
  const handleBirthDateChange = (value) => {
    setBirthDate(value);
  };
  const handleGenderChange = (value) => {
    setGender(value);
  };
  const handleCityChange = (value) => {
    setCity(value);
  };
  const handleEmailChange = (value) => {
    setEmail(value);
  };
  const handlePhotoChange = (value) => {
    setPhoto(value);
  };
  const handleDepartmentChange = (value) => {
    setDepartmentId(value);
  };

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
    setDepartmentName((prev) => ({ ...prev, departmentName: value }));
  };


  useEffect(() => {
    const getStudentsD = async () => {
        try {
            const studentsD = await axios.get(
                "https://localhost:7214/api/Student"
            );
            setStudentsD(studentsD.data);
        }
        catch (err) {
            console.log(err);
        }
    };

    getStudentsD();
}, [refreshD]);

useEffect(() => {
  const getStudentsD = async () => {
      try {
          const studentsD = await axios.get(
              "https://localhost:7214/api/Student"
          );
          setStudentsD(studentsD.data);
      }
      catch (err) {
          console.log(err);
      }
  };

  getStudentsD();
}, [refreshD]);

useEffect(() => {
  const getDepartmentsD = async () => {
    try {
      const response = await axios.get('https://localhost:7214/api/Department');
      setDepartmentsD(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  getDepartmentsD();
}, [refreshD]);

    const handleEdit = (studentId) => {
        setEdito(true);
        setStudentId(studentId);
      };
    
      const handleDelete = (studentId) => {
        setFshij(true);
        setStudentId(studentId);
      };

      const handleAddStudent = async () => {
        await axios
          .post("https://localhost:7214/api/Student", {
            name: name,
            surname: surname,
            birthDate: birthDate,
            gender: gender,
            city: city,
            email: email,
            photo: photo,
            departmentId: departmentId
          })
          .then(() => {
            setShto(false);
            setRefreshD(Date.now());
            setName("");
            setSurname("");
            setBirthDate(0);
            setGender("");
            setCity("");
            setEmail("");
            setPhoto("");
            setDepartmentId("");
            toast.success('Student has been added !');
          })
          .catch((e) => {
            console.error(e);
          });
      };

      const handleUpdateStudent = async () => {
        await axios
          .put(
            `https://localhost:7214/api/Student/${studentId}`,
            student
          )
          .then(() => {
            setEdito(false);
            setRefreshD(Date.now());
            toast.success('Student has been updated !');
          })
          .catch((e) => {
            console.error(e);
          });
      };

      /*const handleDeleteProfessor = async () => {
        await axios
          .delete(`https://localhost:7214/api/Professor?ProfessorId=${professorId}`)
          .then(() => {
            setFshij(false);
            setPerditeso(Date.now());
            toast.success('Professor has been deleted');
          })
          .catch((e) => {
            console.error(e);
          });
    };*/
    
    const handleDeleteStudent = async (studentId) => {
      console.log("Deleting student with ID:", studentId); 
      try {
        await axios.delete(`https://localhost:7214/api/Student/${studentId}`).then(() => {
          setFshij(false);
          setRefreshD(Date.now());
          toast.success('Student has been deleted');
        })
      } catch (e) {
        toast.error('Failed to delete student');
      }
    };

    const tableStyle = {
        overflowX: 'auto',
        display: 'block'
      };
    
      const minWidthStyle = {
        minWidth: '1000px' // Përshtati sipas nevojës për gjerësi të tabelës
      };

    return (
        <>
      <div className="content">
      <ToastContainer/>
      {edito && (
            <Modal
            className="modalEditShto"
            show={edito}
            onHide={() => setEdito(false)}>
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
                <Form.Group controlId = "ProfessorEmail">
                    <Form.Label>Student Email</Form.Label>
                    <Form.Control type="text" name="ProfessorEmail" required placeholder="Email..."
                     value={student.email} onChange={(e)=> handleEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId="DepartmentSelect">
    <Form.Label>Department</Form.Label>
    <Form.Select 
        value={departmentId} 
        onChange={(e) => handleDepartment(e.target.value)} 
        required
    >
        <option value="" hidden disabled>Select Department</option>
        {departments.length > 0 ? (
            departments.map((item) => (
                <option key={item.departmentId} value={item.departmentId}>
                    {item.departmentName}
                </option>
            ))
        ) : (
            <option value="" disabled>No Departments Available</option>
        )}
    </Form.Select>
</Form.Group>
              <br/>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setEdito(false)}>
                Cancel 
              </Button>
              <Button
                onClick={()=> handleUpdateStudent(studentId)}>
                Edit Student 
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        {fshij && (
        <Modal show={fshij} onHide={() => setFshij(false)}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "red" }}>Delete Student</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Are you sure you want to delete this Student?</h6>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setFshij(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => handleDeleteStudent(studentId)}>
              Delete Student
            </Button>
          </Modal.Footer>
        </Modal>
        )}
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Student Table</CardTitle>
              </CardHeader>
              <CardBody>
              <Button onClick={handleShow} style={{marginBottom: "20px", marginTop: "20px"}}>Add Student</Button>
                <Container>
                <div style={tableStyle}>
                <Table style={minWidthStyle} responsive>
                  <thead className="text-primary">
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>BirthDate</th>
                        <th>Gender</th>
                        <th>City</th>
                        <th>Email</th>
                        <th>Department</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                            studentsD.map((item, index)=>{
                                return (
                                    <tr key={item.studentId}>
                                        <td>{index + 1}</td>
                                        <td>{item.studentId}</td>
                                        <td>{item.name}</td>
                                        <td>{item.surname}</td>
                                        <td>{item.birthDate}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.city}</td>
                                        <td>{item.email}</td>
                                        <td>{item.department.departmentName}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => navigate('/admin/profile')}><FontAwesomeIcon icon={faUser} /></button> &nbsp;
                                            <button className="btn btn-danger" onClick={()=> handleDelete(item.studentId)}><FontAwesomeIcon icon={faBan} /></button>
                                        </td>
                                  </tr>
                                )
                            })
                        }
                    </tbody>
                  </Table>
                  </div>
                  </Container>
                  </CardBody>
            </Card>
          </Col>        
        </Row>
        <Fragment>
        {shto && (
                <Modal show={shto} onHide={() => setShto(false)}
                    
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <Modal.Header closeButton>
                            <Modal.Title>Add Student</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                      <Row>
                        <Col >
                            <Form>
                                <Form.Group controlId = "ProfessorName">
                                    <Form.Label>Student Name</Form.Label>
                                    <Form.Control type="text" name="ProfessorName" required placeholder="Name..."
                                    value={name} onChange={(e) => handleNameChange(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <br/>
                                <Form.Group controlId = "ProfessorSurname">
                                    <Form.Label>Student Surname</Form.Label>
                                    <Form.Control type="text" name="ProfessorSurname" required placeholder="Surname..."
                                    value={surname} onChange={(e) => handleSurnameChange(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <br/>
                                <Form.Group controlId = "ProfessorBirthdate">
                                    <Form.Label>Student Date of Birth</Form.Label>
                                    <Form.Control type="date" name="StudentBirthdate" required placeholder="Birthdate..."
                                    value={birthDate} onChange={(e) => handleBirthDateChange(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <br/>
                                <Form.Group controlId="ProfessorGender">
                                  <Form.Label>Student Gender</Form.Label>
                                  <Form.Select 
                                        value={gender}
                                        onChange={(e) => handleGenderChange(e.target.value)} 
                                        required
                                    >
                                        <option value="" hidden disabled>Select Gender</option>
                                        <option value="Female">Female</option>
                                        <option value="Male">Male</option>
                                        {/* Add more options if needed */}
                                    </Form.Select>
                                </Form.Group>
                                <br/>
                                <Form.Group controlId = "ProfessorCity">
                                    <Form.Label>Student City</Form.Label>
                                    <Form.Control type="text" name="ProfessorCity" required placeholder="City..."
                                    value={city} onChange={(e) => handleCityChange(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <br/>
                                <Form.Group controlId = "ProfessorEmail">
                                    <Form.Label>Student Email</Form.Label>
                                    <Form.Control type="text" name="ProfessorEmail" required placeholder="Email..."
                                    value={email} onChange={(e) => handleEmailChange(e.target.value)}>
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
                                  value={departmentId}
                                  onChange={(e) => handleDepartmentChange(e.target.value)}
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
                              <br/>
                                <Form.Group>
                                    <Button variant = "info" type="submit" onClick={handleAddStudent}>
                                        Add New Student
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                      </Modal.Body>
                      <Modal.Footer>
                            <Button variant="danger" onClick={() => setShto(false)}>
                              Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                )}
              </Fragment>
        </div>
        </>
    )
}

export default Studentt;

/*import React, { useState, useEffect, Fragment } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
} from "reactstrap";
import { Button, Modal, Form,Toast, ToastContainer, toast } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

const Studentt = () => {

    const [studentsD, setStudentsD] = useState([]);
    const [departments, setDepartmentsD] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [studentId, setStudentId] = useState(0);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [departmentId, setDepartmentId] = useState('');

    const [refreshD, setRefreshD] = useState("");

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('https://localhost:7214/api/Student');
                setStudentsD(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchStudents();
    }, [refreshD]);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get('https://localhost:7214/api/Department');
                setDepartmentsD(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDepartments();
    }, []);

    const resetForm = () => {
        setStudentId(0);
        setName('');
        setSurname('');
        setBirthDate('');
        setGender('');
        setCity('');
        setEmail('');
        setDepartmentId('');
    };

    const handleShowAddModal = () => {
        resetForm();
        setEditMode(false);
        setShowModal(true);
    };

    const handleShowEditModal = (student) => {
        setStudentId(student.studentId);
        setName(student.name);
        setSurname(student.surname);
        setBirthDate(student.birthDate);
        setGender(student.gender);
        setCity(student.city);
        setEmail(student.email);
        setDepartmentId(student.departmentId);
        setEditMode(true);
        setShowModal(true);
    };

    const [showToast, setShowToast] = useState(false);
const [toastMessage, setToastMessage] = useState('');
const [toastType, setToastType] = useState(''); // 'success' or 'error'

const handleSubmit = async () => {
    const studentData = {
        name,
        surname,
        birthDate,
        gender,
        city,
        email,
        departmentId,
    };

    try {
        if (editMode) {
            await axios.put(`https://localhost:7214/api/Student/${studentId}`, studentData);
            setToastMessage('Student updated successfully');
            setToastType('success');
        } else {
            await axios.post('https://localhost:7214/api/Student', studentData);
            setToastMessage('Student added successfully');
            setToastType('success');
        }

        setShowToast(true);
        setShowModal(false);
        setRefreshD(Date.now());
    } catch (error) {
        setToastMessage('Failed to save student');
        setToastType('error');
        setShowToast(true);
        console.error(error);
    }
};

    return (
        <>
            <div className="content">
            <ToastContainer position="top-end" className="p-3">
    <Toast 
        onClose={() => setShowToast(false)} 
        show={showToast} 
        bg={toastType === 'success' ? 'success' : 'danger'}
        delay={3000} 
        autohide
    >
        <Toast.Body>{toastMessage}</Toast.Body>
    </Toast>
</ToastContainer>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Student Table</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Button onClick={handleShowAddModal} style={{ marginBottom: "20px", marginTop: "20px" }}>Add Student</Button>
                                <Table responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>#</th>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Surname</th>
                                            <th>BirthDate</th>
                                            <th>Gender</th>
                                            <th>City</th>
                                            <th>Email</th>
                                            <th>Department</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            studentsD.map((student, index) => (
                                                <tr key={student.studentId}>
                                                    <td>{index + 1}</td>
                                                    <td>{student.studentId}</td>
                                                    <td>{student.name}</td>
                                                    <td>{student.surname}</td>
                                                    <td>{student.birthDate}</td>
                                                    <td>{student.gender}</td>
                                                    <td>{student.city}</td>
                                                    <td>{student.email}</td>
                                                    <td>{student.department.departmentName}</td>
                                                    <td>
                                                        <Button variant="warning" onClick={() => handleShowEditModal(student)}>Edit</Button>{' '}
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

               
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{editMode ? 'Edit Student' : 'Add Student'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="surname">
                                <Form.Label>Surname</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="birthDate">
                                <Form.Label>Birth Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="gender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="departmentId">
                                <Form.Label>Department</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={departmentId}
                                    onChange={(e) => setDepartmentId(e.target.value)}
                                >
                                    <option value="">Select Department</option>
                                    {departments.map((department) => (
                                        <option key={department.departmentId} value={department.departmentId}>
                                            {department.departmentName}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                        <Button variant="primary" onClick={handleSubmit}>{editMode ? 'Update Student' : 'Add Student'}</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default Studentt;*/