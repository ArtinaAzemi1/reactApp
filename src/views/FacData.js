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

const FacData =() => {

    const [show, setShow] = useState(false);

    const [search, setSearch] = useState ('');

    const [shto, setShto] = useState(false);
    const [edito, setEdito] = useState(false);
    const [fshij, setFshij] = useState(false);
    const [refreshD, setRefreshD] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShto(true);

    const [facultyId, setFacultyId] = useState(0);
    const [name, setName] = useState('')
    const [level, setLevel] = useState('')
    const [semesters, setSemesters] = useState(0)
    const [generation, setGeneration] = useState('')
    const [statuss, setStatus]= useState('');
    const [facultyD, setFacultyD] = useState([]);
    const [faculty, setFaculty] = useState([]);

  const handleNameChange = (value) => {
    setName(value);
  };
  const handleStatusChange = (value) => {
    setStatus(value);
  };
  const handleLevelChange= (value) => {
    setLevel(value);
  };
  const handleSemesterChange = (value) => {
    setSemesters(value);
  };
  const handleGenerationChange = (value) => {
    setGeneration(value);
  };

  const handleName = (value) => {
    setFaculty((prev) => ({ ...prev, name: value }));
  };
  const handleStatus = (value) => {
    setFaculty((prev) => ({ ...prev, statuss: value }));
  };
  const handleLevel = (value) => {
    setFaculty((prev) => ({ ...prev, level: value }));
  };
  const handleSemester = (value) => {
    setFaculty((prev) => ({ ...prev, semesters: value }));
  };
  const handleGeneration = (value) => {
    setFaculty((prev) => ({ ...prev, generation: value }));
  };

    useEffect(() => {
        const getFacultyD = async () => {
            try {
                const facultyD = await axios.get(
                    "https://localhost:7214/api/FacultyData"
                );
                setFacultyD(facultyD.data);
            }
            catch (err) {
                console.log(err);
            }
        };

        getFacultyD();
    }, [refreshD]);

    const handleEdit = (facultyId) => {
        setEdito(true);
        setFacultyId(facultyId);
      };
    
      const handleDelete = (facultyId) => {
        setFshij(true);
        setFacultyId(facultyId);
      };

      const handleAddFacultyData = async () => {
            await axios
            .post("https://localhost:7214/api/FacultyData", {
              name: name,
              level: level,
              semesters: semesters,
              generation: generation,
              statuss: statuss,
            })
            .then(() => {
              setShto(false);
              setRefreshD(Date.now());
              setName("");
              setStatus("");
              setLevel("");
              setSemesters(0);
              setGeneration("");
              toast.success('The data has been added !');
            })
            .catch((e) => {
              console.error(e);
            });
        };

      const handleUpdateFacultyData = async () => {
        await axios
          .put(
            `https://localhost:7214/api/FacultyData/${facultyId}`,
            faculty
          )
          .then(() => {
            setEdito(false);
            setRefreshD(Date.now());
            toast.success('Faculty Data has been updated !');
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

    const handleDeleteFacultyData = async (facultyId) => {
        try {
          await axios.delete(`https://localhost:7214/api/FacultyData/${facultyId}`);
          setRefreshD(Date.now());
          toast.success('Faculty Data has been deleted!');
          setFshij(false);
        } catch (e) {
          console.error("Error deleting Data:", e.response ? e.response.data : e.message);
          toast.error('Failed to delete the Faculty Data.');
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
              <Modal.Title>Edit Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={faculty.name} onChange={(e) => handleName(e.target.value)} placeholder="Name..."/>
                </Form.Group>
                <Form.Group controlId="Level">
                    <Form.Label>Level</Form.Label>
                    <Form.Control type="text" value={faculty.level} onChange={(e) => handleLevel(e.target.value)} placeholder="Level..."/>
                </Form.Group>
                <Form.Group controlId="Semesters">
                    <Form.Label>Semester</Form.Label>
                    <Form.Control type="number" value={faculty.semesters} onChange={(e) => handleSemester(e.target.value)} placeholder="Semester..."/>
                </Form.Group>
                <Form.Group controlId="Generation">
                    <Form.Label>Generation</Form.Label>
                    <Form.Control type="text" value={faculty.generation} onChange={(e) => handleGeneration(e.target.value)} placeholder="Generation..."/>
                </Form.Group>
                <Form.Group controlId="Status">
                    <Form.Label>Status</Form.Label>
                    <Form.Control type="text" value={faculty.statuss} onChange={(e) => handleStatus(e.target.value)} placeholder="Status..."/>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setEdito(false)}>
                Cancel 
              </Button>
              <Button
                onClick={() => handleUpdateFacultyData(facultyId)}>
                Edit Data 
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        {fshij && (
        <Modal show={fshij} onHide={() => setFshij(false)}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "red" }}>Delete Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Are you sure you want to delete this data?</h6>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setFshij(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => handleDeleteFacultyData(facultyId)}>
              Delete Data
            </Button>
          </Modal.Footer>
        </Modal>
        )}
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Data Table</CardTitle>
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
              <Button onClick={handleShow} style={{marginBottom: "20px", marginTop: "20px"}}>Add Data</Button>
              <Container>
              <div style={tableStyle}>
                <Table style={minWidthStyle} responsive>
                  <thead className="text-primary">
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Level</th>
                        <th>Semester</th>
                        <th>Generation</th>
                        <th>Status</th>
                        <th>Options</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                            facultyD.filter((item)=> {return search.toLowerCase() === ''? item : item.name.toLowerCase().includes(search.toLowerCase())})
                            .map((item, index)=>{
                                return (
                                    <tr key={item.facultyId}>
                                        <td>{index + 1}</td>
                                        <td>{item.facultyId}</td>
                                        <td>{item.name}</td>
                                        <td>{item.level}</td>
                                        <td>{item.semesters}</td>
                                        <td>{item.generation}</td>
                                        <td>{item.statuss}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={()=> handleEdit(item.facultyId)}><FontAwesomeIcon icon={faPenToSquare} /></button> &nbsp;
                                            <button className="btn btn-danger" onClick={()=> handleDelete(item.facultyId)}><FontAwesomeIcon icon={faBan} /></button>
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
                            <Modal.Title>Add Data</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                      <Row>
                        <Col >
                            <Form>
                            <Form.Group controlId="Name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={name}
                                            onChange={(e) => handleNameChange(e.target.value)}
                                            placeholder="Name..."
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="Level">
                                        <Form.Label>Level</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={level}
                                            onChange={(e) => handleLevelChange(e.target.value)}
                                            placeholder="Level..."
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="Semesters">
                                        <Form.Label>Semesters</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={semesters}
                                            onChange={(e) => handleSemesterChange(e.target.value)}
                                            placeholder="Semester..."
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="Generation">
                                        <Form.Label>Generation</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={generation}
                                            onChange={(e) => handleGenerationChange(e.target.value)}
                                            placeholder="Generation..."
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="Status">
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={statuss}
                                            onChange={(e) => handleStatusChange(e.target.value)}
                                            placeholder="Status..."
                                        />
                                    </Form.Group>
                                <Form.Group>
                                    <Button variant = "info" type="submit" onClick={handleAddFacultyData}>
                                        Add New Data
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

export default FacData;