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

const Grade =() => {

    const [show, setShow] = useState(false);

    const [search, setSearch] = useState ('');

    const [shto, setShto] = useState(false);
    const [edito, setEdito] = useState(false);
    const [fshij, setFshij] = useState(false);
    const [refreshD, setRefreshD] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShto(true);

    const [gradeId, setGradeId] = useState(0);
    const [value, setValue] = useState(0)
    const [letterGrade, setLetterGrade] = useState('')
    const [status, setStatus] = useState('')
    const [dateOfGrading, setDateOfGrading] = useState('')
    const [gradessD, setGradesD]= useState([]);
    const [grade, setGrade] = useState([]);

  const handleValueChange = (value) => {
    setValue(value);
  };
  const handleStatusChange = (value) => {
    setStatus(value);
  };
  const handleLetterGradeChange = (value) => {
    setLetterGrade(value);
  };
  const handleDateOfGradingChange = (value) => {
    setDateOfGrading(value);
  };

  const handleValue = (value) => {
    setGrade((prev) => ({ ...prev, value: value }));
  };
  const handleStatus = (value) => {
    setGrade((prev) => ({ ...prev, status: value }));
  };
  const handleLetterGrade = (value) => {
    setGrade((prev) => ({ ...prev, letterGrade: value }));
  };
  const handleDateOfGrading = (value) => {
    setGrade((prev) => ({ ...prev, dateOfGrading: value }));
  };

    useEffect(() => {
        const getGradesD = async () => {
            try {
                const gradesD = await axios.get(
                    "https://localhost:7214/api/Grade"
                );
                setGradesD(gradesD.data);
            }
            catch (err) {
                console.log(err);
            }
        };

        getGradesD();
    }, [refreshD]);

    const handleEdit = (gradeId) => {
        setEdito(true);
        setGradeId(gradeId);
      };
    
      const handleDelete = (gradeId) => {
        setFshij(true);
        setGradeId(gradeId);
      };

      const handleAddGrade = async () => {
            await axios
            .post("https://localhost:7214/api/Grade", {
              value: value,
              letterGrade: letterGrade,
              status: status,
              dateOfGrading: dateOfGrading
            })
            .then(() => {
              setShto(false);
              setRefreshD(Date.now());
              setValue("");
              setStatus("");
              setLetterGrade(0);
              setDateOfGrading("");
              toast.success('Grade has been added !');
            })
            .catch((e) => {
              console.error(e);
            });
        };

      const handleUpdateGrade = async () => {
        await axios
          .put(
            `https://localhost:7214/api/Grade/${gradeId}`,
            grade
          )
          .then(() => {
            setEdito(false);
            setRefreshD(Date.now());
            toast.success('Grade has been updated !');
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

    const handleDeleteGrade = async (gradeId) => {
        try {
          await axios.delete(`https://localhost:7214/api/Grade/${gradeId}`);
          setRefreshD(Date.now());
          toast.success('Grade has been deleted!');
          setFshij(false);
        } catch (e) {
          console.error("Error deleting Grade:", e.response ? e.response.data : e.message);
          toast.error('Failed to delete the Grade.');
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
              <Modal.Title>Edit Grade</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId = "Value">
                    <Form.Label>Value</Form.Label>
                    <Form.Control type="text" name="Value" required placeholder="Value..."
                     value={grade.value} onChange={(e)=> handleValue(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId = "LetterGrade">
                    <Form.Label>Grade in Letter</Form.Label>
                    <Form.Control type="text" name="LetterGrade" required placeholder="Letter Grade..."
                     value={grade.letterGrade} onChange={(e)=> handleLetterGrade(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId="Status">
                  <Form.Label>Status</Form.Label>
                  <Form.Control type="text" name="Status" required placeholder="Status..."
                     value={grade.status} onChange={(e)=> handleStatus(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId = "DateOfGrading">
                    <Form.Label>Date of Grading</Form.Label>
                    <Form.Control type="date" name="DateOfGrading" required placeholder="Date Of Grading..."
                    value={grade.dateOfGrading} onChange={(e)=> handleDateOfGrading(e.target.value)}>
                    </Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setEdito(false)}>
                Cancel 
              </Button>
              <Button
                onClick={() => handleUpdateGrade(gradeId)}>
                Edit Grade 
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        {fshij && (
        <Modal show={fshij} onHide={() => setFshij(false)}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "red" }}>Delete Grade</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Are you sure you want to delete this grade?</h6>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setFshij(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => handleDeleteGrade(gradeId)}>
              Delete Grade
            </Button>
          </Modal.Footer>
        </Modal>
        )}
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Grade Table</CardTitle>
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
                        <th>Value</th>
                        <th>Letter Grade</th>
                        <th>Status</th>
                        <th>Date of Grading</th>
                        <th>Options</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                            gradessD.filter((item)=> {return search.toLowerCase() === ''? item : item.value.toLowerCase().includes(search.toLowerCase()) || item.status.toLowerCase().includes(search.toLowerCase())})
                            .map((item, index)=>{
                                return (
                                    <tr key={item.gradeId}>
                                        <td>{index + 1}</td>
                                        <td>{item.gradeId}</td>
                                        <td>{item.value}</td>
                                        <td>{item.letterGrade}</td>
                                        <td>{item.status}</td>
                                        <td>{item.dateOfGrading}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={()=> handleEdit(item.gradeId)}><FontAwesomeIcon icon={faPenToSquare} /></button> &nbsp;
                                            <button className="btn btn-danger" onClick={()=> handleDelete(item.gradeId)}><FontAwesomeIcon icon={faBan} /></button>
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
                            <Modal.Title>Add Grade</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                      <Row>
                        <Col >
                            <Form>
                                <Form.Group controlId = "Value">
                                    <Form.Label>Value</Form.Label>
                                    <Form.Control type="text" name="Value" required placeholder="Value..."
                                     value={value} onChange={(e)=> handleValueChange(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <br/>
                                <Form.Group controlId = "LetterGrade">
                                    <Form.Label>Letter Grade</Form.Label>
                                    <Form.Control type="text" name="LetterGrade" required placeholder="Letter Grade..."
                                     value={letterGrade} onChange={(e)=> handleLetterGradeChange(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <br/>
                                <Form.Group controlId="Status">
                                  <Form.Label>Status</Form.Label>
                                  <Form.Control type="text" name="Status" required placeholder="Status..."
                                   value={status} onChange={(e)=> handleStatusChange(e.target.value)}>
                                  </Form.Control>
                                </Form.Group>
                                <br/>
                                <Form.Group controlId = "DateOfGrading">
                                    <Form.Label>Date of Grading</Form.Label>
                                    <Form.Control type="date" name="DateOfGrading" required placeholder="Date Of Grading..."
                                    value={dateOfGrading} onChange={(e)=> handleDateOfGradingChange(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Button variant = "info" type="submit" onClick={handleAddGrade}>
                                        Add New Grade
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

export default Grade;