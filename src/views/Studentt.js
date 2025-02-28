import React, {useState, useEffect, Fragment} from 'react';

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
    InputGroup, 
    Input,  
    InputGroupText
  } from "reactstrap";

import {Button, Modal, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {ButtonToolbar, Form, Image} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faPenToSquare,
  faPlus,
  faClose,
  faXmark,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import AddStudent from "./AddStudent.js";
import EditStudent from "./EditStudent.js";


const Studentt =() => {

    const [show, setShow] = useState(false);

    const [search, setSearch] = useState ('');

    const [shto, setShto] = useState(false);
    const [edito, setEdito] = useState(false);
    const [fshij, setFshij] = useState(false);
    const [refreshD, setRefreshD] = useState("");

    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShto(true);

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
    const [departmentId, setDepartmentId] = useState(0);
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
    setStudent((prev) => ({ ...prev, departmentId: value }));
  };


  /*useEffect(() => {
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
}, [refreshD]);*/

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

      const handleEdito = () => setEdito(false); 
    
      const handleDelete = (studentId) => {
        setFshij(true);
        setStudentId(studentId);
      };

      
      /*const handleAddStudent = async () => {
        await axios
          .post("https://localhost:7214/api/Student", {
            name: name,
            surname: surname,
            birthDate: birthDate ? new Date(birthDate).toISOString() : null,
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
            setBirthDate("");
            setGender("");
            setCity("");
            setEmail("");
            setPhoto("");
            setDepartmentId(0);
            toast.success('Student has been added !');
          })
          .catch((e) => {
            console.error(e);
          });
      };

      const handleUpdateStudent = async (studentId) => {
        await axios
          .put(
            `https://localhost:7214/api/Student/${studentId}`, {
            name: student.name,
            surname: student.surname,
            birthDate: student.birthDate,
            gender: student.gender,
            city: student.city,
            email: student.email,
            departmentId: student.departmentId

        })
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
      minWidth: '2000px' // Përshtati sipas nevojës për gjerësi të tabelës
    };

    return (
        <>
      <div className="content">
      <ToastContainer/>
      {edito && (
            <EditStudent
            show={handleShow}
            hide={() => setEdito(false)}
            studentId={studentId}
            perditesoTeDhenat={() => setRefreshD(Date.now())}
            />
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
                <br/>
                <form>
                  <InputGroup className="no-border">
                    <Input onChange={(e)=> setSearch(e.target.value)} placeholder="Search..." />
                    <InputGroupText>
                      <i className="nc-icon nc-zoom-split" />
                    </InputGroupText>
                  </InputGroup>
                </form>
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
                        <th>Photo</th>
                        <th>Department</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                            studentsD.filter((item)=> {return search.toLowerCase() === ''? item : item.name.toLowerCase().includes(search.toLowerCase()) || item.departmentName.toLowerCase().includes(search.toLowerCase())})
                            .map((item, index)=>{
                                return (
                                    <tr key={item.studentId}>
                                        <td>{index + 1}</td>
                                        <td>{item.studentId}</td>
                                        <td>{item.name}</td>
                                        <td>{item.surname}</td>
                                        <td>{new Date(item.birthDate).toLocaleDateString('en-GB', { dateStyle: 'short' })}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.city}</td>
                                        <td>{item.email}</td>
                                        <td><Image src={`data:image/jpeg;base64,${item.photo}`} thumbnail /></td>
                                        <td>{item.departmentName}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={()=> handleEdit(item.studentId)}><FontAwesomeIcon icon={faPenToSquare} /></button> &nbsp;
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
        <AddStudent
          show={handleShow}
          hide={() => setShto(false)}
          //shfaqmesazhin={() => setShfaqMesazhin(true)}
          perditesoTeDhenat={() => setRefreshD(Date.now())}
          //setTipiMesazhit={setTipiMesazhit}
          //setPershkrimiMesazhit={setPershkrimiMesazhit}
        />
      )}
              </Fragment>
        </div>
        </>
    )
}

export default Studentt;