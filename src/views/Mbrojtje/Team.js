import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import AddTeam from "./AddTeam";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faPenToSquare, faPlus, faClose } from '@fortawesome/free-solid-svg-icons'
import EditTeam from "./EditTeam";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import {Modal, Container} from 'react-bootstrap';

function Team() {
    const [teams, setTeams] = useState([]);
    const [refreshD, setRefreshD] = useState('');
    const [shto, setShto] = useState(false);
    const [edito, setEdito] = useState(false);
    const [fshij, setFshij] = useState(false);
    const [shfaqMesazhin, setShfaqMesazhin] = useState(false);
    const [tipiMesazhit, setTipiMesazhit] = useState("");
    const [pershkrimiMesazhit, setPershkrimiMesazhit] = useState("");
    const [teamId, setTeamId] = useState(0);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState ('');

    /*const getToken = localStorage.getItem("token");

    const authentikimi = {
        headers: {
            Authorization: `Bearer ${getToken}`,
        },
    };*/

    useEffect(() => {
        const showTeams = async () => {
            try {
                //setLoading(true);
                const team = await axios.get("https://localhost:7214/api/Team");
                setTeams(team.data);
                //setLoading(false);
            } catch (err) {
                console.log(err);
                //setLoading(false);
            }
        };

        showTeams();
    }, [refreshD]);

    const handleClose = () => {
        setShto(false);
    }
    const handleShow = () => setShto(true);

    const handleEdit = (teamId) => {
        setEdito(true)
        setTeamId(teamId)
    };
    const handleEditoMbyll = () => setEdito(false);

    const handleDelete = (teamId) => {
        setFshij(true)
        setTeamId(teamId)
    };
    const handleFshijMbyll = () => setFshij(false);

    const handleDeleteTeam = async (teamId) => {
      try {
        await axios.delete(`https://localhost:7214/api/Team/${teamId}`);
        setRefreshD(Date.now());
        toast.success('Team has been deleted!');
        setFshij(false);
      } catch (e) {
        console.error("Error deleting team:", e.response ? e.response.data : e.message);
        toast.error('Failed to delete the team.');
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
        <div className="content">
            {shto && <AddTeam
                shfaq={handleShow}
                largo={handleClose}
                //shfaqmesazhin={() => setShfaqMesazhin(true)}
                perditesoTeDhenat={() => setRefreshD(Date.now())}
                //setTipiMesazhit={setTipiMesazhit}
                //setPershkrimiMesazhit={setPershkrimiMesazhit}
            />}
            {edito && <EditTeam
                largo={handleEditoMbyll}
                teamId={teamId}
                //shfaqmesazhin={() => setShfaqMesazhin(true)}
                perditesoTeDhenat={() => setRefreshD(Date.now())}
                //setTipiMesazhit={setTipiMesazhit}
                //setPershkrimiMesazhit={setPershkrimiMesazhit}
            />}
            {fshij && (
        <Modal show={fshij} onHide={() => setFshij(false)}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "red" }}>Delete Team</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Are you sure you want to delete this particular team?</h6>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setFshij(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => handleDeleteTeam(teamId)}>
              Delete Team
            </Button>
          </Modal.Footer>
        </Modal>
        )}
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Team Table</CardTitle>
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
              <Button onClick={handleShow} style={{marginBottom: "20px", marginTop: "20px"}}>Add Team</Button>
              <Container>
                <div style={tableStyle}>
                <Table style={minWidthStyle} responsive>
                  <thead className="text-primary">
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Options</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                            teams.filter((item)=> {return search.toLowerCase() === ''? item : (item.teamName.toLowerCase().includes(search.toLowerCase()))})
                            .map((item, index)=>{
                                return (
                                    <tr key={item.teamId}>
                                        <td>{index + 1}</td>
                                        <td>{item.teamId}</td>
                                        <td>{item.teamName}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={()=> handleEdit(item.teamId)}><FontAwesomeIcon icon={faPenToSquare} /></button> &nbsp;
                                            <button className="btn btn-danger" onClick={()=> handleDelete(item.teamId)}><FontAwesomeIcon icon={faBan} /></button>
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
        </div >
    );
};

export default Team;




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

const Team =() => {

    const [show, setShow] = useState(false);

    const [search, setSearch] = useState ('');

    const [shto, setShto] = useState(false);
    const [edito, setEdito] = useState(false);
    const [fshij, setFshij] = useState(false);
    const [refreshD, setRefreshD] = useState("");

    const handleClose = () => setShto(false);
    const handleShow = () => setShto(true);

    const [teamId, setTeamId] = useState(0);
    const [teamName, setTeamName] = useState("")
    const [teamsD, setTeamsD]= useState([]);
    const [team, setTeam] = useState([]);

  const handleNameChange = (value) => {
    setTeamName(value);
  };

  const handleName = (value) => {
    setTeam((prev) => ({ ...prev, teamName: value }));
  };

    useEffect(() => {
        const getTeamsD = async () => {
            try {
                const teamD = await axios.get(
                    "https://localhost:7214/api/Team"
                );
                console.log(teamD.data); 
                setTeamsD(teamD.data);
            }
            catch (err) {
                console.log(err);
            }
        };

        getTeamsD();
    }, [refreshD]);

    const handleEdit = (teamId) => {
        setEdito(true);
        setTeamId(teamId);
    };
    
      const handleDelete = (teamId) => {
        setFshij(true);
        setTeamId(teamId);
      };

      const handleAddTeam = async () => {
        await axios
          .post("https://localhost:7214/api/Team", {
            teamName: teamName
          })
          .then(() => {
            setShto(false);
            toast.success('Team has been added !');
            setRefreshD(Date.now());
            setTeamName("");
          })
          .catch((e) => {
            console.error(e);
            toast.error('Failed to add team !');
          });
      };

      const handleUpdateTeam = async (teamId) => {
        await axios
          .put(
            `https://localhost:7214/api/Team/${teamId}`,
            team
          )
          .then(() => {
            setRefreshD(Date.now());
            toast.success('Team has been updated !');
            setEdito(false);
          })
          .catch((e) => {
            console.error(e);
            toast.error('Failed to update team !');
          });
      };

    const handleDeleteTeam = async (teamId) => {
      try {
        await axios.delete(`https://localhost:7214/api/Team/${teamId}`);
        setRefreshD(Date.now());
        toast.success('Team has been deleted!');
        setFshij(false);
      } catch (e) {
        console.error("Error deleting team:", e.response ? e.response.data : e.message);
        toast.error('Failed to delete the team.');
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
              <Modal.Title>Edit Team</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId = "Name">
                  <Form.Label>Team Name</Form.Label>
                  <Form.Control type="text" name="Name" required placeholder="Name..."
                  value={team.teamName} onChange={(e)=> handleName(e.target.value)}>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setEdito(false)}>
                Cancel 
              </Button>
              <Button
                onClick={() => handleUpdateTeam(teamId)}>
                Edit Team 
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        {fshij && (
        <Modal show={fshij} onHide={() => setFshij(false)}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "red" }}>Delete Team</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Are you sure you want to delete this particular team?</h6>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setFshij(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => handleDeleteTeam(teamId)}>
              Delete Team
            </Button>
          </Modal.Footer>
        </Modal>
        )}
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Team Table</CardTitle>
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
              <Button onClick={handleShow} style={{marginBottom: "20px", marginTop: "20px"}}>Add Team</Button>
              <Container>
                <div style={tableStyle}>
                <Table style={minWidthStyle} responsive>
                  <thead className="text-primary">
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Options</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                            teamsD.filter((item)=> {return search.toLowerCase() === ''? item : (item.teamName.toLowerCase().includes(search.toLowerCase()))})
                            .map((item, index)=>{
                                return (
                                    <tr key={item.teamId}>
                                        <td>{index + 1}</td>
                                        <td>{item.teamId}</td>
                                        <td>{item.teamName}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={()=> handleEdit(item.teamId)}><FontAwesomeIcon icon={faPenToSquare} /></button> &nbsp;
                                            <button className="btn btn-danger" onClick={()=> handleDelete(item.teamId)}><FontAwesomeIcon icon={faBan} /></button>
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
                            <Modal.Title>Add Team</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                      <Row>
                        <Col >
                            <Form>
                                <Form.Group controlId = "Name">
                                    <Form.Label>Name of the Team</Form.Label>
                                    <Form.Control type="text" name="Name" required placeholder="Name..."
                                    value={teamName} onChange={(e) => handleNameChange(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Button variant = "info" type="submit" onClick={handleAddTeam}>
                                        Add New Team
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

export default Team;*/