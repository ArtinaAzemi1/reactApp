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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faPenToSquare,
  faPlus,
  faClose,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import AddProfessor from "./AddProfessor.js"
import EditProfessor from "./EditProfessor.js"

const Professor =() => {

    const [show, setShow] = useState(false);

    const [search, setSearch] = useState ('');

    const [shto, setShto] = useState(false);
    const [edito, setEdito] = useState(false);
    const [fshij, setFshij] = useState(false);
    const [refreshD, setRefreshD] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShto(true);

    const [professorId, setProfessorId] = useState(0);
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [gender, setGender] = useState('')
    const [city, setCity] = useState('')
    const [email, setEmail] = useState('')
    const [photo, setPhoto] = useState('')
    const [professorsD, setProfessorsD]= useState([]);
    const [professor, setProfessor] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [departmentId, setDepartmentId] = useState(0);
    const [departmentName, setDeparmentName] = useState('')

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
  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };
  const handleDepartmentChange = (value) => {
    setDepartments(value);
  };

  const [profesori, setProfesori] = useState([]);

  const handleName = (value) => {
    setProfessor((prev) => ({ ...prev, name: value }));
  };

  const handleSurname = (value) => {
    setProfessor((prev) => ({ ...prev, surname: value }));
  };
  const handleBirthDate = (value) => {
    setProfessor((prev) => ({ ...prev, birthDate: value }));
  };
  const handleGender = (value) => {
    setProfessor((prev) => ({ ...prev, gender: value }));
  };
  const handleCity = (value) => {
    setProfessor((prev) => ({ ...prev, city: value }));
  };
  const handleEmail = (value) => {
    setProfessor((prev) => ({ ...prev, email: value }));
  };
  const handlePhoto = (event) => {
    setProfessor(event.target.files[0]);
  };
  const handleDepartment = (value) => {
    setProfessor((prev) => ({ ...prev, departmentId: value }));
  };

    useEffect(() => {
        const getProffesorsD = async () => {
            try {
                const professorsD = await axios.get(
                    "https://localhost:7214/api/Professor"
                );
                setProfessorsD(professorsD.data);
            }
            catch (err) {
                console.log(err);
            }
        };

        getProffesorsD();
    }, [refreshD]);

    useEffect(() => {
      const getDepartmentsD = async () => {
        try {
          const departments = await axios.get('https://localhost:7214/api/Department');
          setDepartments(departments.data);
        } catch (err) {
          console.log(err);
        }
      };
    
      getDepartmentsD();
    }, [refreshD]);

    

    const handleEdit = (professorId) => {
        setEdito(true);
        setProfessorId(professorId);
      };
    
      const handleDelete = (professorId) => {
        setFshij(true);
        setProfessorId(professorId);
      };

      const handleAddProfessor = async () => {
        if (photo) {
          const formData = new FormData();
          formData.append('photo', photo);
    
        }
            await axios
            .post("https://localhost:7214/api/Professor", {
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
              setDepartments(0);
              toast.success('Professor has been added !');
            })
            .catch((e) => {
              console.error(e);
            });
        };

      const handleUpdateProfessor = async () => {
        await axios
          .put(
            `https://localhost:7214/api/Professor/${professorId}`,
            professor
          )
          .then(() => {
            setEdito(false);
            setRefreshD(Date.now());
            toast.success('Professor has been updated !');
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
    
    /*const handleDeleteProfessor = async () => {
      console.log("Deleting professor with ID:", professorId); 
      try {
        await axios.delete(`https://localhost:7214/api/Professor` + professorId).then(() => {
          setFshij(false);
          setRefreshD(Date.now());
          toast.success('Professor has been deleted');
        })
      } catch (e) {
        toast.error('Failed to delete professor');
      }
    };*/

    const handleDeleteProfessor = async (professorId) => {
        try {
          await axios.delete(`https://localhost:7214/api/Professor/${professorId}`);
          setRefreshD(Date.now());
          toast.success('Professor has been deleted!');
          setFshij(false);
        } catch (e) {
          console.error("Error deleting professor:", e.response ? e.response.data : e.message);
          toast.error('Failed to delete the professor.');
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
            <EditProfessor
            show={handleShow}
            hide={() => setEdito(false)}
            professorId={professorId}
            perditesoTeDhenat={() => setRefreshD(Date.now())}
            />
        )}
        {fshij && (
        <Modal show={fshij} onHide={() => setFshij(false)}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "red" }}>Delete Professor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Are you sure you want to delete this professor?</h6>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setFshij(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => handleDeleteProfessor(professorId)}>
              Delete Professor
            </Button>
          </Modal.Footer>
        </Modal>
        )}
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Professor Table</CardTitle>
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
              <Button onClick={handleShow} style={{marginBottom: "20px", marginTop: "20px"}}>Add Professor</Button>
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
                        <th>Options</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                            professorsD.filter((item)=> {return search.toLowerCase() === ''? item : item.name.toLowerCase().includes(search.toLowerCase()) || item.city.toLowerCase().includes(search.toLowerCase())})
                            .map((item, index)=>{
                                return (
                                    <tr key={item.professorId}>
                                        <td>{index + 1}</td>
                                        <td>{item.professorId}</td>
                                        <td>{item.name}</td>
                                        <td>{item.surname}</td>
                                        <td>{new Date(item.birthDate).toLocaleDateString('en-GB', { dateStyle: 'short' })}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.city}</td>
                                        <td>{item.email}</td>
                                        <td><Image src={`data:image/jpeg;base64,${professor.photo}`} thumbnail /></td>
                                        <td>{item.departmentName}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={()=> handleEdit(item.professorId)}><FontAwesomeIcon icon={faPenToSquare} /></button> &nbsp;
                                            <button className="btn btn-danger" onClick={()=> handleDelete(item.professorId)}><FontAwesomeIcon icon={faBan} /></button>
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
        <AddProfessor
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

export default Professor;