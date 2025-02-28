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
  InputGroupText
} from 'reactstrap';
import { Button, Modal, Container, Form, Image } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';

const Professsor = () => {
  const [show, setShow] = useState(false);
  const [shto, setShto] = useState(false);
  const [edito, setEdito] = useState(false);
  const [fshij, setFshij] = useState(false);
  const [refreshD, setRefreshD] = useState("");
  const [professorId, setProfessorId] = useState(0);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');
  const [professorsD, setProfessorsD] = useState([]);
  const [professor, setProfessor] = useState({});

  const handleNameChange = (value) => setName(value);
  const handleSurnameChange = (value) => setSurname(value);
  const handleBirthDateChange = (value) => setBirthDate(value);
  const handleGenderChange = (value) => setGender(value);
  const handleCityChange = (value) => setCity(value);
  const handleEmailChange = (value) => setEmail(value);
  const handlePhotoChange = (event) => setPhoto(event.target.files[0]);

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
          photo: photo
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
  return (
    <>
      <div className="content">
        <ToastContainer />
        {edito && (
          <Modal className="modalEditShto" show={edito} onHide={() => setEdito(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Professor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="ProfessorName">
                  <Form.Label>Professor Name</Form.Label>
                  <Form.Control type="text" name="ProfessorName" required placeholder="Name..."
                    value={professor.name} onChange={(e)=> handleName(e.target.value)}>
                  </Form.Control>
                </Form.Group>
                <br />
                <Form.Group controlId="ProfessorSurname">
                  <Form.Label>Professor Surname</Form.Label>
                  <Form.Control type="text" name="ProfessorSurname" required placeholder="Surname..."
                    value={professor.surname} onChange={(e)=> handleSurname(e.target.value)}>
                  </Form.Control>
                </Form.Group>
                <br />
                <Form.Group controlId="ProfessorBirthdate">
                  <Form.Label>Professor Date of Birth</Form.Label>
                  <Form.Control type="date" name="ProfessorBirthdate" required placeholder="Birthdate..."
                    value={professor.birthDate} onChange={(e)=> handleBirthDate(e.target.value)}/>
                </Form.Group>
                <br />
                <Form.Group controlId="ProfessorGender">
                  <Form.Label>Professor Gender</Form.Label>
                  <Form.Select
                    value={professor.gender} 
                    onChange={(e)=> handleGender(e.target.value)}
                    required
                  >
                    <option value="" hidden disabled>Select Gender</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                  </Form.Select>
                </Form.Group>
                <br />
                <Form.Group controlId="ProfessorCity">
                  <Form.Label>Professor City</Form.Label>
                  <Form.Control type="text" name="ProfessorCity" required placeholder="City..."
                    value={professor.city} onChange={(e)=> handleCity(e.target.value)}/>
                </Form.Group>
                <br />
                <Form.Group controlId="ProfessorEmail">
                  <Form.Label>Professor Email</Form.Label>
                  <Form.Control type="email" name="ProfessorEmail" required placeholder="Email..."
                    value={professor.email} onChange={(e)=> handleEmail(e.target.value)}/>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setEdito(false)}>Cancel</Button>
              <Button onClick={() => handleUpdateProfessor(professorId)}>Edit Professor</Button>
            </Modal.Footer>
          </Modal>
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
              <Button variant="secondary" onClick={() => setFshij(false)}>Cancel</Button>
              <Button variant="danger" onClick={() => handleDeleteProfessor(professorId)}>Delete Professor</Button>
            </Modal.Footer>
          </Modal>
        )}
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Professor Information</CardTitle>
              </CardHeader>
              <CardBody>
                <Button onClick={() => setShto(true)} style={{ marginBottom: "20px", marginTop: "-10px", marginLeft: "710px" }}>
                  <FontAwesomeIcon icon={faPlus} /> Add Professor
                </Button>
                {shto && (
                  <Modal className="modalEditShto" show={shto} onHide={() => setShto(false)}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add Professor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group controlId="ProfessorName">
                          <Form.Label>Professor Name</Form.Label>
                          <Form.Control type="text" name="ProfessorName" required placeholder="Name..."
                            value={name} onChange={(e) => handleNameChange(e.target.value)} />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="ProfessorSurname">
                          <Form.Label>Professor Surname</Form.Label>
                          <Form.Control type="text" name="ProfessorSurname" required placeholder="Surname..."
                            value={surname} onChange={(e) => handleSurnameChange(e.target.value)} />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="ProfessorBirthdate">
                          <Form.Label>Professor Date of Birth</Form.Label>
                          <Form.Control type="date" name="ProfessorBirthdate" required placeholder="Birthdate..."
                            value={birthDate} onChange={(e) => handleBirthDateChange(e.target.value)} />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="ProfessorGender">
                          <Form.Label>Professor Gender</Form.Label>
                          <Form.Select
                            value={gender}
                            onChange={(e) => handleGenderChange(e.target.value)}
                            required
                          >
                            <option value="" hidden disabled>Select Gender</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                          </Form.Select>
                        </Form.Group>
                        <br />
                        <Form.Group controlId="ProfessorCity">
                          <Form.Label>Professor City</Form.Label>
                          <Form.Control type="text" name="ProfessorCity" required placeholder="City..."
                            value={city} onChange={(e) => handleCityChange(e.target.value)} />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="ProfessorEmail">
                          <Form.Label>Professor Email</Form.Label>
                          <Form.Control type="email" name="ProfessorEmail" required placeholder="Email..."
                            value={email} onChange={(e) => handleEmailChange(e.target.value)} />
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={() => setShto(false)}>Cancel</Button>
                      <Button onClick={handleAddProfessor}>Add Professor</Button>
                    </Modal.Footer>
                  </Modal>
                )}
                <Table className="table-hover" responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Surname</th>
                      <th>Birth Date</th>
                      <th>Gender</th>
                      <th>City</th>
                      <th>Email</th>
                      <th>Photo</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {professorsD.map((professor) => (
                      <Fragment key={professor.professorId}>
                        <tr>
                          <td>{professor.professorId}</td>
                          <td>{professor.name}</td>
                          <td>{professor.surname}</td>
                          <td>{new Date(professor.birthDate).toLocaleDateString()}</td>
                          <td>{professor.gender}</td>
                          <td>{professor.city}</td>
                          <td>{professor.email}</td>
                          <td><Image src={`data:image/jpeg;base64,${professor.photo}`} thumbnail /></td>
                          <td>
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              className="ml-2 text-primary"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleEdit(professor.professorId)}
                            />
                          </td>
                          <td>
                            <FontAwesomeIcon
                              icon={faBan}
                              className="ml-2 text-danger"
                              style={{ cursor: "pointer" }}
                              onClick={()=> handleDelete(professor.professorId)}
                            />
                          </td>
                        </tr>
                      </Fragment>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Professsor;