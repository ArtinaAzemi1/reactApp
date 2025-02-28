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

const Courses =() => {

    const [show, setShow] = useState(false);

    const [search, setSearch] = useState ('');

    const [shto, setShto] = useState(false);
    const [edito, setEdito] = useState(false);
    const [fshij, setFshij] = useState(false);
    const [refreshD, setRefreshD] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShto(true);

    const [courseId, setCourseId] = useState(0);
    const [name, setName] = useState("")
    const [semester, setSemester] = useState(0)
    const [ects, setEcts] = useState(0)
    const [coursesD, setCoursesD]= useState([]);
    const [course, setCourse] = useState([]);

  const handleNameChange = (value) => {
    setName(value);
  };
  const handleSemesterChange = (value) => {
    setSemester(value);
  };
  const handleEctsChange = (value) => {
    setEcts(value);
  };

  const handleName = (value) => {
    setCourse((prev) => ({ ...prev, name: value }));
  };

  const handleSemester = (value) => {
    setCourse((prev) => ({ ...prev, semester: value }));
  };
  const handleEcts = (value) => {
    setCourse((prev) => ({ ...prev, ects: value }));
  };

    useEffect(() => {
        const getCoursesD = async () => {
            try {
                const coursesD = await axios.get(
                    "https://localhost:7214/api/Course"
                );
                console.log(coursesD.data); 
                setCoursesD(coursesD.data);
            }
            catch (err) {
                console.log(err);
            }
        };

        getCoursesD();
    }, [refreshD]);

    const handleEdit = (courseId) => {
        setEdito(true);
        setCourseId(courseId);
    };
    
      const handleDelete = (courseId) => {
        setFshij(true);
        setCourseId(courseId);
      };

      const handleAddCourse = async () => {
        await axios
          .post("https://localhost:7214/api/Course", {
            name: name,
            semester: semester,
            ects: ects
          })
          .then(() => {
            setShto(false);
            setRefreshD(Date.now());
            setName("");
            setSemester(0);
            setEcts(0);
            toast.success('Course has been added !');
          })
          .catch((e) => {
            console.error(e);
          });
      };

      const handleUpdateCourse = async () => {
        await axios
          .put(
            `https://localhost:7214/api/Course/${courseId}`,
            course
          )
          .then(() => {
            setEdito(false);
            setRefreshD(Date.now());
            toast.success('Course has been updated !');
          })
          .catch((e) => {
            console.error(e);
          });
      };

    const handleDeleteCourse = async (courseId) => {
      try {
        await axios.delete(`https://localhost:7214/api/Course/${courseId}`);
        setRefreshD(Date.now());
        toast.success('Course has been deleted!');
        setFshij(false);
      } catch (e) {
        console.error("Error deleting course:", e.response ? e.response.data : e.message);
        toast.error('Failed to delete the course.');
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
              <Modal.Title>Edit Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId = "Name">
                  <Form.Label>Course Name</Form.Label>
                  <Form.Control type="text" name="Name" required placeholder="Name..."
                  value={course.name} onChange={(e)=> handleName(e.target.value)}>
                  </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId = "Semester">
                    <Form.Label>Semester</Form.Label>
                    <Form.Control type="number" name="Semester" required placeholder="Semester..."
                     value={course.semester} onChange={(e)=> handleSemester(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId = "ECTS">
                    <Form.Label>ECTS</Form.Label>
                    <Form.Control type="number" name="ECTS" required placeholder="ECTS..."
                     value={course.ects} onChange={(e)=> handleEcts(e.target.value)}>
                    </Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setEdito(false)}>
                Cancel 
              </Button>
              <Button
                onClick={() => handleUpdateCourse(courseId)}>
                Edit Course 
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        {fshij && (
        <Modal show={fshij} onHide={() => setFshij(false)}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "red" }}>Delete Course</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Are you sure you want to delete this particular course?</h6>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setFshij(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => handleDeleteCourse(courseId)}>
              Delete Course
            </Button>
          </Modal.Footer>
        </Modal>
        )}
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Course Table</CardTitle>
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
              <Button onClick={handleShow} style={{marginBottom: "20px", marginTop: "20px"}}>Add Course</Button>
              <Container>
                <div style={tableStyle}>
                <Table style={minWidthStyle} responsive>
                  <thead className="text-primary">
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Semester</th>
                        <th>ECTS</th>
                        <th>Options</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                            coursesD.filter((item)=> {return search.toLowerCase() === ''? item : (item.name.toLowerCase().includes(search.toLowerCase()))})
                            .map((item, index)=>{
                                return (
                                    <tr key={item.courseId}>
                                        <td>{index + 1}</td>
                                        <td>{item.courseId}</td>
                                        <td>{item.name}</td>
                                        <td>{item.semester}</td>
                                        <td>{item.ects}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={()=> handleEdit(item.courseId)}><FontAwesomeIcon icon={faPenToSquare} /></button> &nbsp;
                                            <button className="btn btn-danger" onClick={()=> handleDelete(item.courseId)}><FontAwesomeIcon icon={faBan} /></button>
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
                            <Modal.Title>Add Course</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                      <Row>
                        <Col >
                            <Form>
                                <Form.Group controlId = "Name">
                                    <Form.Label>Name of the Course</Form.Label>
                                    <Form.Control type="text" name="Name" required placeholder="Name..."
                                    value={name} onChange={(e) => handleNameChange(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <br/>
                                <Form.Group controlId = "Semester">
                                    <Form.Label>Semester</Form.Label>
                                    <Form.Select 
                                        value={semester}
                                        onChange={(e) => handleSemesterChange(e.target.value)} 
                                        required
                                    >
                                        <option value="" hidden disabled>Select Semester</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        {/* Add more options if needed */}
                                    </Form.Select>
                                </Form.Group>
                                <br/>
                                <Form.Group controlId = "ECTS">
                                    <Form.Label>ECTS</Form.Label>
                                    <Form.Select 
                                        value={ects}
                                        onChange={(e) => handleEctsChange(e.target.value)} 
                                        required
                                    >
                                        <option value="" hidden disabled>Select ECTS</option>
                                        <option value="4.00">4.00</option>
                                        <option value="5.00">5.00</option>
                                        <option value="6.00">6.00</option>
                                        {/* Add more options if needed */}
                                    </Form.Select>
                                </Form.Group>
                                <br/>
                                <Form.Group>
                                    <Button variant = "info" type="submit" onClick={handleAddCourse}>
                                        Add New Course
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

export default Courses;