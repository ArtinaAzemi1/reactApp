import React, { useState, useEffect, Fragment } from 'react';
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
  InputGroupText,
} from 'reactstrap';
import { Button, Modal, Container, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBan,
  faPenToSquare,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
//import AddStudent from "./AddStudent.js";
import EditDepartment from "./EditDepartment.js";
import AddDepartment from './AddDepartment.js';

const Departmentt = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [search, setSearch] = useState('');
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState([]);
  const [departmentId, setDepartmentId] = useState(null);

  const [shto, setShto] = useState(false);
  const [edito, setEdito] = useState(false);
  const [fshij, setFshij] = useState(false);
  const [refreshD, setRefreshD] = useState("");


  const handleShow = () => setShto(true);
  const handleEdito = () => setShowEditModal(true);

  const handleEdit = (departmentId) => {
    setEdito(true);
    setDepartmentId(departmentId);
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const department = await axios.get('https://localhost:7214/api/Department');
        setDepartments(department.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, [refreshD]);

  const handleDelete = async (departmentId) => {
    console.log("Deleting department with ID:", departmentId); 
    try {
      await axios.delete(`https://localhost:7214/api/Department/${departmentId}`).then(() => {
        setFshij(false);
        setRefreshD(Date.now());
        toast.success('Department has been deleted');
      })
    } catch (e) {
      toast.error('Failed to delete department');
    }
  };

  return (
    <>
      <div className="content">
        <ToastContainer />
        {edito && (
          <EditDepartment
          show={handleShow}
          hide={() => setEdito(false)}
          departmentId={departmentId}
          perditesoTeDhenat={() => setRefreshD(Date.now())}
          />
        )}
        {showDeleteModal && (
          <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title style={{ color: 'red' }}>Delete Department</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to delete this department?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete Department
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        {shto && (
          <AddDepartment
          show={handleShow}
          hide={() => setShto(false)}
          perditesoTeDhenat={() => setRefreshD(Date.now())}
          />
        )}
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Department Table</CardTitle>
                <InputGroup className="no-border" style={{ marginBottom: '20px' }}>
                  <Input onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
                  <InputGroupText>
                    <i className="nc-icon nc-zoom-split" />
                  </InputGroupText>
                </InputGroup>
                <Button onClick={handleShow} style={{ marginBottom: '20px' }}>
                  Add Department
                </Button>
              </CardHeader>
              <CardBody>
                <Container>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Dean Name</th>
                        <th>Staff Count</th>
                        <th>Options</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departments
                        .filter((item) => { return search.toLowerCase() === '' ? item : item.departmentName.toLowerCase().includes(search.toLowerCase())})
                        .map((item, index) => (
                          <tr key={item.departmentId}>
                            <td>{index + 1}</td>
                            <td>{item.departmentId}</td>
                            <td>{item.departmentName}</td>
                            <td>{item.deanName}</td>
                            <td>{item.stafCount}</td>
                            <td>
                            <button className="btn btn-primary" onClick={()=> handleEdit(item.departmentId)}><FontAwesomeIcon icon={faPenToSquare} /></button> &nbsp;
                            <button className="btn btn-danger" onClick={()=> handleDelete(item.departmentId)}><FontAwesomeIcon icon={faBan} /></button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </Container>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Departmentt;

/*import React, {useState, useEffect, Fragment} from 'react';

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

const Departmentt =() => {

    const [show, setShow] = useState(false);

    const [search, setSearch] = useState ('');

    const [shto, setShto] = useState(false);
    const [edito, setEdito] = useState(false);
    const [fshij, setFshij] = useState(false);
    const [refreshD, setRefreshD] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShto(true);

    const [departmentId, setDepartmentId] = useState(0);
    const [departmentName, setDepartmentName] = useState('');
    const [deanName, setDeanName] = useState('');
    const [stafCount, setStafCount] = useState(0);
    const [departmentsD, setDepartmentsD]= useState([]);
    const [department, setDepartment] = useState([]);
    const [students, setStudents]= useState([]);

  const handleDepartmentNameChange = (value) => {
    setDepartmentName(value);
  };
  const handleDeanNameChange = (value) => {
    setDeanName(value);
  };
  const handleStafCountChange = (value) => {
    setStafCount(value);
  };

  const handleName = (value) => {
    setDepartment((prev) => ({ ...prev, name: value }));
  };
  const handleDeanName = (value) => {
    setDepartment((prev) => ({ ...prev, deanName: value }));
  };
  const handleStafCount = (value) => {
    setDepartment((prev) => ({ ...prev, stafCount: value }));
  };

  useEffect(() => {
    const getDepartmentsD = async () => {
        try {
            const departmentsD = await axios.get(
                "https://localhost:7214/api/Department"
            );
            setDepartmentsD(departmentsD.data);
        }
        catch (err) {
            console.log(err);
        }
    };

    getDepartmentsD();
}, [refreshD]);

    const handleEdit = (departmentId) => {
        setEdito(true);
        setDepartmentId(departmentId);
      };
    
      const handleDelete = (departmentId) => {
        setFshij(true);
        setDepartmentId(departmentId);
      };

    const handleAddDepartment = async () => {
      await axios
        .post("https://localhost:7214/api/Department", {
          departmentName: departmentName,
          deanName: deanName,
          stafCount: stafCount
        })
        .then(() => {
          setShto(false);
          setRefreshD(Date.now());
          setDepartmentName("");
          setDeanName("");
          setStafCount(0);
          toast.success('Department has been added!');
        })
        .catch((e) => {
          console.error(e);
          toast.error('Failed to add department !');
        });
    };

      const handleUpdateDepartment = async () => {
        await axios
          .put(
            `https://localhost:7214/api/Department/${departmentId}`,{ 
            departmentName: department.departmentName,
            deanName: department.deanName,
            stafCount: department.stafCount
      })
          .then(() => {
            setEdito(false);
            setRefreshD(Date.now());
            toast.success('Department has been updated !');
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
    
    /*const handleDeleteDepartment = async (departmentId) => {
      try {
        await axios.delete(`https://localhost:7214/api/Department/${departmentId}`).then(() => {
          setFshij(false);
          setRefreshD(Date.now());
          toast.success('Department has been deleted');
        })
      } catch (e) {
        toast.error('Failed to delete department');
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
              <Modal.Title>Edit Department</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId = "ProfessorName">
                  <Form.Label>Department Name</Form.Label>
                  <Form.Control type="text" name="ProfessorName" required placeholder="Name..."
                  value={department.departmentName} onChange={(e)=> handleName(e.target.value)}>
                  </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId = "ProfessorDeanName">
                    <Form.Label>Department DeanName</Form.Label>
                    <Form.Control type="text" name="ProfessorDeanName" required placeholder="DeanName..."
                     value={department.deanName} onChange={(e)=> handleDeanName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId = "ProfessorStafCount">
                    <Form.Label>Staf Count</Form.Label>
                    <Form.Control type="number" name="StudentStafCount" required placeholder="StafCount..."
                     value={department.stafCount} onChange={(e)=> handleStafCount(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <br/>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setEdito(false)}>
                Cancel 
              </Button>
              <Button
                onClick={() => handleUpdateDepartment(departmentId)}>
                Edit Department 
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        {fshij && (
        <Modal show={fshij} onHide={() => setFshij(false)}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "red" }}>Delete Department</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Are you sure you want to delete this department?</h6>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setFshij(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => handleDeleteDepartment(departmentId)}>
              Delete Department
            </Button>
          </Modal.Footer>
        </Modal>
        )}
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Department Table</CardTitle>
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
              <Button onClick={handleShow} style={{marginBottom: "20px", marginTop: "20px"}}>Add Department</Button>
              <Container>
              <div style={tableStyle}>
                <Table style={minWidthStyle} responsive>
                  <thead className="text-primary">
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Dean Name</th>
                        <th>Staf Count</th>
                        <th>Options</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                        departmentsD.filter((item)=> {return search.toLowerCase() === ''? item : item.departmentName.toLowerCase().includes(search.toLowerCase())})
                        .map((item, index) => {
                          return (
                              <tr key={item.departmentId}>
                              <td>{index + 1}</td>
                              <td>{item.departmentId}</td>
                              <td>{item.departmentName}</td>
                              <td>{item.deanName}</td>
                              <td>{item.stafCount}</td>
                              <td>
                                  <button className="btn btn-primary" onClick={() => handleEdit(item.departmentId)}><FontAwesomeIcon icon={faPenToSquare} /></button> &nbsp;
                                  <button className="btn btn-danger" onClick={() => handleDelete(item.departmentId)}><FontAwesomeIcon icon={faBan} /></button>
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
                            <Modal.Title>Add Department</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                      <Row>
                        <Col >
                            <Form>
                                <Form.Group controlId = "ProfessorName">
                                    <Form.Label>Department Name</Form.Label>
                                    <Form.Control type="text" name="ProfessorName" required placeholder="Name..."
                                    value={departmentName} onChange={(e) => handleDepartmentNameChange(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <br/>
                                <Form.Group controlId = "ProfessorSurname">
                                    <Form.Label>Dean Name</Form.Label>
                                    <Form.Control type="text" name="ProfessorSurname" required placeholder="Surname..."
                                    value={deanName} onChange={(e) => handleDeanNameChange(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <br/>
                                <Form.Group controlId = "StaffNumber">
                                    <Form.Label>Staff Number</Form.Label>
                                    <Form.Control type="number" name="StaffNumber" required placeholder="Staff Number..."
                                     value={stafCount} onChange={(e)=> handleStafCountChange(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Button variant = "info" type="submit" onClick={handleAddDepartment}>
                                        Add New Department
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

export default Departmentt;*/