import React, {useState, useEffect, Fragment} from 'react';
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, InputGroup, Input, InputGroupText} from "reactstrap";
import {Button, Modal, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faPenToSquare, faPlus, faClose, faXmark, faUser} from "@fortawesome/free-solid-svg-icons";
import AddCourse from './AddCourse';
import EditCourse from './EditCourse';



const Course =() => {

    const [show, setShow] = useState(false);

    const [search, setSearch] = useState ('');

    const [shto, setShto] = useState(false);
    const [edito, setEdito] = useState(false);
    const [fshij, setFshij] = useState(false);

    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShto(true);

    const [courseId, setCourseId] = useState(0);
    const [coursesD, setCoursesD]= useState([]);
    const [refreshD, setRefreshD] = useState("");
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        const getCoursesD = async () => {
            try {
                const coursesD = await axios.get(
                    "https://localhost:7028/api/Course"
                );
                setCoursesD(coursesD.data);
            }
            catch (err) {
                console.log(err);
            }
        };
      
        getCoursesD();
      }, [refreshD]);
  
      const handleEdit = (course) => {
        setSelectedCourse(course);
        setEdito(true);
    };
  
      const handleEdito = () => setEdito(false); 
    
      const handleDelete = (courseId) => {
        setFshij(true);
        setCourseId(courseId);
      };
  
      const handleDeleteCourse = async (courseId) => {
        console.log("Deleting course with ID:", courseId); 
        try {
          await axios.delete(`https://localhost:7028/api/Course/${courseId}`).then(() => {
            setFshij(false);
            setRefreshD(Date.now());
            toast.success('Course deleted succesfully!')
          })
        } catch (e) {
            toast.error('Failed to delete the course.');
        }
      };
  

    const tableStyle = {
      overflowX: 'auto',
      display: 'block'
    };
  
    const minWidthStyle = {
      minWidth: '1500px' // Përshtati sipas nevojës për gjerësi të tabelës
    };

    return (
        <>
      <div className="content">
              {fshij && (
              <Modal show={fshij} onHide={() => setFshij(false)}>
                <Modal.Header closeButton>
                  <Modal.Title style={{ color: "red" }}>Delete Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h6>Are you sure you want to delete this Course?</h6>
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
              <Button onClick={handleShow} style={{marginBottom: "20px", marginTop: "20px"}}><FontAwesomeIcon icon={faPlus}/>  Add Course</Button>
              <Container>
                <div style={tableStyle}>
                <Table style={minWidthStyle} responsive>
                  <thead className="text-primary">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Code</th>
                        <th>ECTS</th>
                        <th>Category</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                            coursesD.filter((item)=> {return search.toLowerCase() === ''? item : item.courseName.toLowerCase().includes(search.toLowerCase())})
                            .map((item, index)=>{
                                return (
                                    <tr key={item.courseId}>
                                        <td>{index + 1}</td>
                                        <td>{item.courseName}</td>
                                        <td>{item.code}</td>
                                        <td>{item.credits}</td>
                                        <td>{item.category}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={()=> handleEdit(item)}><FontAwesomeIcon icon={faPenToSquare} /></button> &nbsp;
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
        
        <AddCourse
                    show={shto}
                    handleClose={() => setShto(false)}
                    refreshData={() => setRefreshD(Date.now())}
                />

{selectedCourse && (
                    <EditCourse
                        show={edito}
                        handleClose={() => setEdito(false)}
                        refreshData={() => setRefreshD(Date.now())}
                        course={selectedCourse}
                    />
                )}
              </Fragment>
              <ToastContainer/>
        </div>
        </>
    )
}

export default Course;
