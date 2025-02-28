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

const AdContacts =() => {

    const [show, setShow] = useState(false);

    const [search, setSearch] = useState ('');

    const [shto, setShto] = useState(false);
    const [edito, setEdito] = useState(false);
    const [fshij, setFshij] = useState(false);
    const [refreshD, setRefreshD] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShto(true);

    const [id, setId] = useState(0);
    const [state, setState] = useState("");
    const [residence, setResidence] = useState("");
    const [adress, setAddress] = useState("");
    const [zipCode, setZipCode] = useState(0);
    const [telephone, setTelephone] = useState(0);
    const [nationality, setNationality] = useState("");
    const [placeOfBirth, setPlaceOfBirth] = useState("");
    const [citizenship, setCitizenship] = useState("");
    const [contactsD, setContactsD]= useState([]);
    const [contact, setContact] = useState([]);

    const handleStateChange = (value) => {
        setState(value);
    };
    const handleResidenceChange = (value) => {
        setResidence(value);
    };
    const handleAddressChange = (value) => {
        setAddress(value);
    };
    const handleZipCodeChange = (value) => {
        setZipCode(value);
    };
    const handleTelephoneChange = (value) => {
        setTelephone(value);
    };
    const handleNationalityChange = (value) => {
        setNationality(value);
    };
    const handlePlaceOfBirthChange = (value) => {
        setPlaceOfBirth(value);
    };
    const handleCitizenshipChange = (value) => {
        setCitizenship(value);
    };

    const handleState = (value) => {
        setContact((prev) => ({ ...prev, state: value }));
      };
      const handleResidence = (value) => {
        setContact((prev) => ({ ...prev, residence: value }));
      };
      const handleAddress = (value) => {
        setContact((prev) => ({ ...prev, adress: value }));
      };
      const handleZipCode = (value) => {
        setContact((prev) => ({ ...prev, zipCode: value }));
      };
      const handleTelephone = (value) => {
        setContact((prev) => ({ ...prev, telephone: value }));
      };
      const handleNationality = (value) => {
        setContact((prev) => ({ ...prev, nationality: value }));
      };
      const handlePlaceOfBirth = (value) => {
        setContact((prev) => ({ ...prev, placeOfBirth: value }));
      };
      const handleCitizenship = (value) => {
        setContact((prev) => ({ ...prev, citizenship: value }));
      };
    

    useEffect(() => {
        const getContactsD = async () => {
            try {
                const contactsD = await axios.get(
                    "https://localhost:7214/api/AdditionalContacts"
                );
                setContactsD(contactsD.data);
            }
            catch (err) {
                console.log(err);
            }
        };

        getContactsD();
    }, [refreshD]);

    const handleEdit = (id) => {
        setEdito(true);
        setId(id);
    };
    
    const handleDelete = (id) => {
        setFshij(true);
        setId(id);
    };

    const handleAddFacultyData = async () => {
        await axios
            .post("https://localhost:7214/api/AdditionalContacts", {
                state: state,
                residence: residence,
                adress: adress,
                zipCode: zipCode,
                telephone: telephone,
                nationality: nationality,
                placeOfBirth: placeOfBirth,
                citizenship: citizenship
            })
            .then(() => {
                setShto(false);
                setRefreshD(Date.now());
                setState("");
                setResidence("");
                setAddress("");
                setZipCode(0);
                setTelephone(0);
                setNationality("");
                setPlaceOfBirth("");
                setCitizenship("");
                toast.success('Contact has been added!');
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const handleUpdateContact = async () => {
        await axios
          .put(
            `https://localhost:7214/api/AdditionalContacts/${id}`,
            contact
          )
          .then(() => {
            setEdito(false);
            setRefreshD(Date.now());
            toast.success('Contact has been updated!');
          })
          .catch((e) => {
            console.error(e);
          });
    };

    const handleDeleteContact = async (id) => {
        try {
          await axios.delete(`https://localhost:7214/api/AdditionalContacts/${id}`);
          setRefreshD(Date.now());
          toast.success('Contact has been deleted!');
          setFshij(false);
        } catch (e) {
          console.error("Error deleting Contact:", e.response ? e.response.data : e.message);
          toast.error('Failed to delete the Contact.');
        }
    };

    const tableStyle = {
      overflowX: 'auto',
      display: 'block'
    };
  
    const minWidthStyle = {
      minWidth: '1000px'
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
              <Modal.Title>Edit Contact</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId = "State">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" name="State" required placeholder="State..."
                     value={contact.state} onChange={(e)=> handleState(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId = "Residence">
                    <Form.Label>Residence</Form.Label>
                    <Form.Control type="text" name="Residence" required placeholder="Residence..."
                     value={contact.residence} onChange={(e)=> handleResidence(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId="Address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" name="Address" required placeholder="Address..."
                     value={contact.adress} onChange={(e)=> handleAddress(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId = "ZipCode">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control type="number" name="ZipCode" required placeholder="Zip Code..."
                    value={contact.zipCode} onChange={(e)=> handleZipCode(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId = "Telephone">
                    <Form.Label>Telephone</Form.Label>
                    <Form.Control type="number" name="Telephone" required placeholder="Telephone..."
                    value={contact.telephone} onChange={(e)=> handleTelephone(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId = "Nationality">
                    <Form.Label>Nationality</Form.Label>
                    <Form.Control type="text" name="Nationality" required placeholder="Nationality..."
                    value={contact.nationality} onChange={(e)=> handleNationality(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId = "PlaceOfBirth">
                    <Form.Label>Place of Birth</Form.Label>
                    <Form.Control type="text" name="PlaceOfBirth" required placeholder="Place of Birth..."
                    value={contact.placeOfBirth} onChange={(e)=> handlePlaceOfBirth(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId = "Citizenship">
                    <Form.Label>Citizenship</Form.Label>
                    <Form.Control type="text" name="Citizenship" required placeholder="Citizenship..."
                    value={contact.citizenship} onChange={(e)=> handleCitizenship(e.target.value)}>
                    </Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setEdito(false)}>
                Cancel 
              </Button>
              <Button
                onClick={() => handleUpdateContact(id)}>
                Edit Contact 
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        {fshij && (
        <Modal show={fshij} onHide={() => setFshij(false)}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "red" }}>Delete Contact</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Are you sure you want to delete this contact?</h6>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setFshij(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => handleDeleteContact(id)}>
              Delete Contact
            </Button>
          </Modal.Footer>
        </Modal>
        )}
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">All Contacts</CardTitle>
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
              <Button onClick={handleShow} style={{marginBottom: "20px", marginTop: "20px"}}>Add Contact</Button>
              <Container>
              <div style={tableStyle}>
              <Table style={minWidthStyle} responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>State</th>
                      <th>Residence</th>
                      <th>Address</th>
                      <th>Zip Code</th>
                      <th>Telephone</th>
                      <th>Nationality</th>
                      <th>Place of Birth</th>
                      <th>Citizenship</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactsD.filter((item)=> {return search.toLowerCase() === ''? item : item.residence.toLowerCase().includes(search.toLowerCase())})
                    .map((contact, index) => (
                      <tr key={index}>
                        <td>{contact.state}</td>
                        <td>{contact.residence}</td>
                        <td>{contact.adress}</td>
                        <td>{contact.zipCode}</td>
                        <td>{contact.telephone}</td>
                        <td>{contact.nationality}</td>
                        <td>{contact.placeOfBirth}</td>
                        <td>{contact.citizenship}</td>
                        <td>
                          <Button
                            className="btn-link btn-icon"
                            color="success"
                            size="sm"
                            onClick={() => handleEdit(contact.id)}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </Button>
                          <Button
                            className="btn-link btn-danger btn-icon"
                            color="danger"
                            size="sm"
                            onClick={() => handleDelete(contact.id)}
                          >
                            <FontAwesomeIcon icon={faBan} />
                          </Button>
                        </td>
                      </tr>
                    ))}
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
                            <Modal.Title>Add Contact</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                      <Row>
                        <Col >
                            <Form>
                            <Form.Group controlId = "State">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" name="State" required placeholder="State..."
                     value={state} onChange={(e)=> handleStateChange(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId = "Residence">
                    <Form.Label>Residence</Form.Label>
                    <Form.Control type="text" name="Residence" required placeholder="Residence..."
                     value={residence} onChange={(e)=> handleResidenceChange(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId="Address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" name="Address" required placeholder="Address..."
                     value={adress} onChange={(e)=> handleAddressChange(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId = "ZipCode">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control type="number" name="ZipCode" required placeholder="Zip Code..."
                    value={zipCode} onChange={(e)=> handleZipCodeChange(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId = "Telephone">
                    <Form.Label>Telephone</Form.Label>
                    <Form.Control type="number" name="Telephone" required placeholder="Telephone..."
                    value={telephone} onChange={(e)=> handleTelephoneChange(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId = "Nationality">
                    <Form.Label>Nationality</Form.Label>
                    <Form.Control type="text" name="Nationality" required placeholder="Nationality..."
                    value={nationality} onChange={(e)=> handleNationalityChange(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId = "PlaceOfBirth">
                    <Form.Label>Place of Birth</Form.Label>
                    <Form.Control type="text" name="PlaceOfBirth" required placeholder="Place of Birth..."
                    value={placeOfBirth} onChange={(e)=> handlePlaceOfBirthChange(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId = "Citizenship">
                    <Form.Label>Citizenship</Form.Label>
                    <Form.Control type="text" name="Citizenship" required placeholder="Citizenship..."
                    value={citizenship} onChange={(e)=> handleCitizenshipChange(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <br/>
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
    );
}

export default AdContacts;