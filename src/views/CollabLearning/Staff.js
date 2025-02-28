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


const Staff =() => {

    const [show, setShow] = useState(false);

    const [search, setSearch] = useState ('');

    const [shto, setShto] = useState(false);
    const [edito, setEdito] = useState(false);
    const [fshij, setFshij] = useState(false);

    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShto(true);

    const [id, setId] = useState(0);
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [staffD, setStaffD]= useState([]);
    const [staff, setStaff] = useState([]);
    const [refreshD, setRefreshD] = useState("");
    const [title, setTitle] = useState('')
    const [subjectArea, setSubjectArea] = useState('')
    const [researchField, setResearchField] = useState('')
    const [assistsInGrading, setAssistsInGrading] = useState('')
    const [helpsWithProjects, setHelpsWithProjects] = useState('')
    const [fieldOfExpertise, setFieldOfExpertise] = useState('')
    const [yearsOfExperience, setYearsOfExperience] = useState(0)
    const [certificationLevel, setCertificationLevel] = useState('')
    const [professorD, setProfessorD]= useState([]);
    const [assistantD, setAssistantD]= useState([]);
    const [coordinatorD, setCoordinatorD]= useState([]);

    useEffect(() => {
        const getStaffD = async () => {
            try {
                const staffD = await axios.get(
                    "https://localhost:7110/api/Staff"
                );
                setStaffD(staffD.data);
            }
            catch (err) {
                console.log(err);
            }
        };
      
        getStaffD();
      }, [refreshD]);

      useEffect(() => {
        const getProfessorD = async () => {
            try {
                const professorD = await axios.get(
                    "https://localhost:7110/api/Professor"
                );
                setProfessorD(professorD.data);
            }
            catch (err) {
                console.log(err);
            }
        };
      
        getProfessorD();
      }, [refreshD]);

      useEffect(() => {
        const getAssistantD = async () => {
            try {
                const assistantD = await axios.get(
                    "https://localhost:7110/api/Assistant"
                );
                setAssistantD(assistantD.data);
            }
            catch (err) {
                console.log(err);
            }
        };
      
        getAssistantD();
      }, [refreshD]);

      useEffect(() => {
        const getCoordinatorD = async () => {
            try {
                const coordinatorD = await axios.get(
                    "https://localhost:7110/api/Coordinator"
                );
                setCoordinatorD(coordinatorD.data);
            }
            catch (err) {
                console.log(err);
            }
        };
      
        getCoordinatorD();
      }, [refreshD]);
  
      const handleNameChange = (value) => {
        setName(value);
      };
      const handleSurnameChange = (value) => {
        setSurname(value);
      };
      const handleEmailChange = (value) => {
        setEmail(value);
      };
    
      const handleName = (value) => {
        setStaff((prev) => ({ ...prev, name: value }));
      };
    
      const handleSurname = (value) => {
        setStaff((prev) => ({ ...prev, surname: value }));
      };
      const handleEmail = (value) => {
        setStaff((prev) => ({ ...prev, email: value }));
      };
      const handleGroup = (value) => {
        setStaff((prev) => ({ ...prev, groupId: value }));
      };
  
      const handleEdit = (id) => {
        setEdito(true);
        setId(id);
      };
  
      const handleEdito = () => setEdito(false); 
    
      const handleDelete = (id) => {
        setFshij(true);
        setId(id);
      };
  
      const handleDeleteStaff = async (id) => {
        console.log("Deleting staff with ID:", id); 
        try {
          await axios.delete(`https://localhost:7110/api/Staff/${id}`).then(() => {
            setFshij(false);
            setRefreshD(Date.now());
          })
        } catch (e) {
         
        }
      };
      
      const combinedData = [...professorD, ...staffD];

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
            id={id}
            perditesoTeDhenat={() => setRefreshD(Date.now())}
            />
        )}
        {fshij && (
        <Modal show={fshij} onHide={() => setFshij(false)}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "red" }}>Delete Staff</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Are you sure you want to delete this Staff?</h6>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setFshij(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => handleDeleteStaff(id)}>
              Delete Staff
            </Button>
          </Modal.Footer>
        </Modal>
        )}
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Staff Table</CardTitle>
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
              <Button onClick={handleShow} style={{marginBottom: "20px", marginTop: "20px"}}>Add Staff</Button>
              <Container>
                <div style={tableStyle}>
                <Table style={minWidthStyle} responsive>
                  <thead className="text-primary">
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                            staffD.filter((item)=> {return search.toLowerCase() === ''? item : item.name.toLowerCase().includes(search.toLowerCase())})
                            .map((item, index)=>{
                                return (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.surname}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={()=> handleEdit(item.id)}><FontAwesomeIcon icon={faPenToSquare} /></button> &nbsp;
                                            <button className="btn btn-danger" onClick={()=> handleDelete(item.id)}><FontAwesomeIcon icon={faBan} /></button>
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
                        <th>Email</th>
                        <th>Title</th>
                        <th>SubjectArea</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                            professorD.filter((item)=> {return search.toLowerCase() === ''? item : item.name.toLowerCase().includes(search.toLowerCase())})
                            .map((item, index)=>{
                                return (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.surname}</td>
                                        <td>{item.email}</td>
                                        <td>{item.title}</td>
                                        <td>{item.subjectArea}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={()=> handleEdit(item.id)}><FontAwesomeIcon icon={faPenToSquare} /></button> &nbsp;
                                            <button className="btn btn-danger" onClick={()=> handleDelete(item.id)}><FontAwesomeIcon icon={faBan} /></button>
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

        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Assistant Table</CardTitle>
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
              <Button onClick={handleShow} style={{marginBottom: "20px", marginTop: "20px"}}>Add Assistant</Button>
              <Container>
                <div style={tableStyle}>
                <Table style={minWidthStyle} responsive>
                  <thead className="text-primary">
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                        <th>ResearchField</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                            assistantD.filter((item)=> {return search.toLowerCase() === ''? item : item.name.toLowerCase().includes(search.toLowerCase())})
                            .map((item, index)=>{
                                return (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.surname}</td>
                                        <td>{item.email}</td>
                                        <td>{item.researchField}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={()=> handleEdit(item.id)}><FontAwesomeIcon icon={faPenToSquare} /></button> &nbsp;
                                            <button className="btn btn-danger" onClick={()=> handleDelete(item.id)}><FontAwesomeIcon icon={faBan} /></button>
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

        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Coordinator Table</CardTitle>
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
              <Button onClick={handleShow} style={{marginBottom: "20px", marginTop: "20px"}}>Add Coordinator</Button>
              <Container>
                <div style={tableStyle}>
                <Table style={minWidthStyle} responsive>
                  <thead className="text-primary">
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                        <th>FieldOfExpertise</th>
                        <th>YearsOfExperience</th>
                        <th>CertificationLevel</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                            coordinatorD.filter((item)=> {return search.toLowerCase() === ''? item : item.name.toLowerCase().includes(search.toLowerCase())})
                            .map((item, index)=>{
                                return (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.surname}</td>
                                        <td>{item.email}</td>
                                        <td>{item.fieldOfExpertise}</td>
                                        <td>{item.yearsOfExperience}</td>
                                        <td>{item.certificationLevel}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={()=> handleEdit(item.id)}><FontAwesomeIcon icon={faPenToSquare} /></button> &nbsp;
                                            <button className="btn btn-danger" onClick={()=> handleDelete(item.id)}><FontAwesomeIcon icon={faBan} /></button>
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

export default Staff;