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
import AddPlayer from './AddPlayer.js';
import EditPlayer from "./EditPlayer.js";


const Player =() => {

    const [show, setShow] = useState(false);

    const [search, setSearch] = useState ('');

    const [shto, setShto] = useState(false);
    const [edito, setEdito] = useState(false);
    const [fshij, setFshij] = useState(false);
    const [refreshD, setRefreshD] = useState("");

    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShto(true);

    const [playerId, setPlayerId] = useState(0);
    const [name, setName] = useState('')
    const [number, setNumber] = useState(0)
    const [birthYear, setBirthYear] = useState('')
    const [playersD, setPlayersD]= useState([]);
    const [player, setPlayer] = useState([]);
    const [teams, setTeamsD] = useState([]);
    const [teamId, setTeamId] = useState(0);
    const [teamName, setTeamName] = useState("");

  /*const handleNameChange = (value) => {
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
    ((prev) => ({ ...prev, departmentId: value }));
  };*/


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
  const getPlayersD = async () => {
      try {
          const playersD = await axios.get(
              "https://localhost:7214/api/Player"
          );
          setPlayersD(playersD.data);
      }
      catch (err) {
          console.log(err);
      }
  };

  getPlayersD();
}, [refreshD]);

useEffect(() => {
  const getTeamsD = async () => {
    try {
      const response = await axios.get('https://localhost:7214/api/Team');
      setTeamsD(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  getTeamsD();
}, [refreshD]);



    const handleEdit = (playerId) => {
        setEdito(true);
        setPlayerId(playerId);
      };

      const handleEdito = () => setEdito(false); 
    
      const handleDelete = (playerId) => {
        setFshij(true);
        setPlayerId(playerId);
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
    
    const handleDeleteStudent = async (playerId) => {
      console.log("Deleting player with ID:", playerId); 
      try {
        await axios.delete(`https://localhost:7214/api/Player/${playerId}`).then(() => {
          setFshij(false);
          setRefreshD(Date.now());
          toast.success('Player has been deleted');
        })
      } catch (e) {
        toast.error('Failed to delete player');
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
            <EditPlayer
            show={handleShow}
            hide={() => setEdito(false)}
            playerId={playerId}
            perditesoTeDhenat={() => setRefreshD(Date.now())}
            />
        )}
        {fshij && (
        <Modal show={fshij} onHide={() => setFshij(false)}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "red" }}>Delete Player</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Are you sure you want to delete this Player?</h6>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setFshij(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => handleDeleteStudent(playerId)}>
              Delete Student
            </Button>
          </Modal.Footer>
        </Modal>
        )}
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Player Table</CardTitle>
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
              <Button onClick={handleShow} style={{marginBottom: "20px", marginTop: "20px"}}>Add Player</Button>
              <Container>
                <div style={tableStyle}>
                <Table style={minWidthStyle} responsive>
                  <thead className="text-primary">
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Number</th>
                        <th>BirthYear</th>
                        <th>Team</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                            playersD.filter((item)=> {return search.toLowerCase() === ''? item : item.name.toLowerCase().includes(search.toLowerCase()) || item.teamName.toLowerCase().includes(search.toLowerCase())})
                            .map((item, index)=>{
                                return (
                                    <tr key={item.playerId}>
                                        <td>{index + 1}</td>
                                        <td>{item.playerId}</td>
                                        <td>{item.name}</td>
                                        <td>{item.number}</td>
                                        <td>{new Date(item.birthYear).toLocaleDateString('en-GB', { dateStyle: 'short' })}</td>
                                        <td>{item.teamName}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={()=> handleEdit(item.playerId)}><FontAwesomeIcon icon={faPenToSquare} /></button> &nbsp;
                                            <button className="btn btn-danger" onClick={()=> handleDelete(item.playerId)}><FontAwesomeIcon icon={faBan} /></button>
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
        <AddPlayer
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

export default Player;