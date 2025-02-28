import React, { useState, useEffect, Fragment } from 'react';
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, InputGroup, Input, InputGroupText} from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container} from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faPenToSquare, faPlus, faClose, faXmark, faUser} from "@fortawesome/free-solid-svg-icons";
import AddLocation from './AddLocation';
import EditLocation from './EditLocation';

const Location = () => {
  const [locations, setLocations] = useState([]);
  const [isAddLocationOpen, setIsAddLocationOpen] = useState(false);
  const [isEditLocationOpen, setIsEditLocationOpen] = useState(false);
  const [locationId, setLocationId] = useState(null);

  const [search, setSearch] = useState ('');

  const [fshij, setFshij] = useState(false);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get('https://localhost:7028/api/Location');
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations!', error);
    }
  };

  const handleAddLocationToggle = () => setIsAddLocationOpen(!isAddLocationOpen);
  const handleEditLocationToggle = (id) => {
    setLocationId(id);
    setIsEditLocationOpen(!isEditLocationOpen);
  };

  const handleDelete = (locationId) => {
        setFshij(true);
        setLocationId(locationId);
      };
  
      const handleDeleteLocation = async (locationId) => {
        console.log("Deleting location with ID:", locationId); 
        try {
          await axios.delete(`https://localhost:7028/api/Location/${locationId}`).then(() => {
            setFshij(false);
            setLocations((prevLocations) => prevLocations.filter(l => l.locationId !== locationId));
            toast.success('Location deleted succesfully!')
          })
        } catch (e) {
            toast.error('Failed to delete the location.');
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
    <div className='content'>
        {fshij && (
            <Modal show={fshij} onHide={() => setFshij(false)}>
              <Modal.Header closeButton>
                <Modal.Title style={{ color: "red" }}>Delete Location</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h6>Are you sure you want to delete this Location?</h6>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setFshij(false)}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={() => handleDeleteLocation(locationId)}>
                  Delete Location
                </Button>
              </Modal.Footer>
            </Modal>
        )}
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Location Table</CardTitle>
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
            <Button onClick={handleAddLocationToggle} style={{marginBottom: "20px", marginTop: "20px"}}><FontAwesomeIcon icon={faPlus}/>  Add Location</Button>
            <Container>
              <div style={tableStyle}>
              <Table style={minWidthStyle} responsive>
                <thead className="text-primary">
                  <tr>
                      <th>#</th>
                      <th>Address</th>
                      <th>City</th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                          locations.filter((location)=> {return search.toLowerCase() === ''? location : location.city.toLowerCase().includes(search.toLowerCase())})
                          .map((location, index)=>{
                              return (
                                  <tr key={location.locationId}>
                                      <td>{index + 1}</td>
                                      <td>{location.address}</td>
                                      <td>{location.city}</td>
                                      <td>
                                          <button className="btn btn-primary"  onClick={() => handleEditLocationToggle(location.locationId)}><FontAwesomeIcon icon={faPenToSquare} /></button> &nbsp;
                                          <button className="btn btn-danger" onClick={()=> handleDelete(location.locationId)}><FontAwesomeIcon icon={faBan} /></button>
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
        {/* Modals */}
        <AddLocation isOpen={isAddLocationOpen} toggle={handleAddLocationToggle} fetchLocations={fetchLocations} />
        <EditLocation isOpen={isEditLocationOpen} toggle={handleEditLocationToggle} locationId={locationId} fetchLocations={fetchLocations} />
    </Fragment>
    <ToastContainer/>
    </div>
  );
};

export default Location;