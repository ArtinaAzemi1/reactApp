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


const Student =() => {

    const [show, setShow] = useState(false);

    const [search, setSearch] = useState ('');

    const [shto, setShto] = useState(false);
    const [edito, setEdito] = useState(false);
    const [fshij, setFshij] = useState(false);

    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShto(true);

    const [studentId, setStudentId] = useState(0);
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [studentsD, setStudentsD]= useState([]);
    const [student, setStudent] = useState([]);
    const [refreshD, setRefreshD] = useState("");
    const [groups, setGroupsD] = useState([]);
    const [groupId, setGroupId] = useState(0);
    const [groupName, setGroupName] = useState("");

    useEffect(() => {
        const getStudentsD = async () => {
            try {
                const studentsD = await axios.get(
                    "https://localhost:7110/api/Student"
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
        const getGroupsD = async () => {
            try {
                const groupsD = await axios.get(
                    "https://localhost:7110/api/Group"
                );
                setGroupsD(groupsD.data);
            }
            catch (err) {
                console.log(err);
            }
        };
      
        getGroupsD();
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
  
      const handleDeleteStudent = async (studentId) => {
        console.log("Deleting student with ID:", studentId); 
        try {
          await axios.delete(`https://localhost:7110/api/Student/${studentId}`).then(() => {
            setFshij(false);
            setRefreshD(Date.now());
          })
        } catch (e) {
         
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
                        <th>Email</th>
                        <th>Group-ID</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                            studentsD.filter((item)=> {return search.toLowerCase() === ''? item : item.name.toLowerCase().includes(search.toLowerCase())})
                            .map((item, index)=>{
                                return (
                                    <tr key={item.studentId}>
                                        <td>{index + 1}</td>
                                        <td>{item.studentId}</td>
                                        <td>{item.name}</td>
                                        <td>{item.surname}</td>
                                        <td>{item.email}</td>
                                        <td>{item.groupId}</td>
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
        <AddStudent show={shto} handleClose={() => setShto(false)} refresh={() => setRefreshD(Date.now())} />
      )}
              </Fragment>
        </div>
        </>
    )
}

export default Student;

/*import React, { useState, useEffect } from "react";
import { Button, Table } from "reactstrap";
import AddStudent from "./AddStudent";
import EditStudent from "./EditStudent";

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      const response = await fetch("https://localhost:7110/api/Student");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = async (student) => {
    try {
      await fetch("https://localhost:7110/api/Student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });
      fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleEditStudent = async (student) => {
    try {
      await fetch(`https://localhost:7110/api/Student/${student.studentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });
      fetchStudents();
    } catch (error) {
      console.error("Error editing student:", error);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await fetch(`https://localhost:7110/api/Student/${id}`, { method: "DELETE" });
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div>
      <h2>Student Management</h2>
      <Button color="primary" onClick={() => setAddModalOpen(true)}>
        Add Student
      </Button>
      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Group ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentId}>
              <td>{student.studentId}</td>
              <td>{student.name}</td>
              <td>{student.surname}</td>
              <td>{student.email}</td>
              <td>{student.groupId}</td>
              <td>
                <Button color="warning" onClick={() => {
                  setCurrentStudent(student);
                  setEditModalOpen(true);
                }}>
                  Edit
                </Button>{" "}
                <Button color="danger" onClick={() => handleDeleteStudent(student.studentId)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AddStudent
        isOpen={addModalOpen}
        toggle={() => setAddModalOpen(false)}
        onAdd={handleAddStudent}
      />
      <EditStudent
        isOpen={editModalOpen}
        toggle={() => setEditModalOpen(false)}
        onEdit={handleEditStudent}
        currentStudent={currentStudent}
      />
    </div>
  );
};

export default StudentManagement;*/