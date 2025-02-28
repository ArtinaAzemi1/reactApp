import React, {useState, useEffect, Fragment} from 'react';

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
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

const Grupet =() => {

    const [show, setShow] = useState(false);

    const [shto, setShto] = useState(false);
    const [edito, setEdito] = useState(false);
    const [fshij, setFshij] = useState(false);
    const [refreshD, setRefreshD] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShto(true);

    const [professorId, setProfessorId] = useState(0);
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [gender, setGender] = useState('')
    const [city, setCity] = useState('')
    const [email, setEmail] = useState('')
    const [photo, setPhoto] = useState('')
    const [professorsD, setProfessorsD]= useState([]);
    const [professor, setProfessor] = useState([]);

    return (
        <>
      <div className="content">
      <ToastContainer/>
        <Row>
            <Col md="12">
            <Card>
                <CardHeader>
                    <CardTitle tag="h4">
                        Trancript
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <Table border="1">
                        <thead className="trancriptHead">
                            <tr>
                                <th style={{ border: '1px solid black', borderRadius: "50px", padding: '8px' }}>Field Study</th>
                                <th style={{ border: '1px solid black', borderRadius: "50px", padding: '8px' }}>Level</th>
                                <th style={{ border: '1px solid black', borderRadius: "50px", padding: '8px' }}>Status</th>
                                <th style={{ border: '1px solid black', borderRadius: "50px", padding: '8px' }}>Trancript</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ border: '1px solid grey', padding: '8px' }}>Computer Science and Engineering</td>
                                <td style={{ border: '1px solid grey', padding: '8px' }}>Bachelor</td>
                                <td style={{ border: '1px solid grey', padding: '8px' }}>Active</td>
                                <td style={{ border: '1px solid grey', padding: '8px' }}><button className="btn btn-primary">Generate Trancript</button></td>
                            </tr>
                        </tbody>
                    </Table>
                </CardBody>
                <hr style={{ margin: '0 20px', borderTop: '1px solid black' }} />
                <CardBody>
                    <Table border="1">
                        <thead className="trancriptHead">
                            <tr>
                                <th style={{ border: '1px solid black', borderRadius: "50px", padding: '8px' }}>Code</th>
                                <th style={{ border: '1px solid black', borderRadius: "50px", padding: '8px' }}>Course</th>
                                <th style={{ border: '1px solid black', borderRadius: "50px", padding: '8px' }}>ECTS</th>
                                <th style={{ border: '1px solid black', borderRadius: "50px", padding: '8px' }}>Category</th>
                                <th style={{ border: '1px solid black', borderRadius: "50px", padding: '8px' }}>Grade</th>
                                <th style={{ border: '1px solid black', borderRadius: "50px", padding: '8px' }}>Letter Grade</th>
                                <th style={{ border: '1px solid black', borderRadius: "50px", padding: '8px' }}>Grade Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ border: '1px solid grey', padding: '8px' }}>40CS1150</td>
                                <td style={{ border: '1px solid grey', padding: '8px' }}>Algorithms</td>
                                <td style={{ border: '1px solid grey', padding: '8px' }}>5.00</td>
                                <td style={{ border: '1px solid grey', padding: '8px' }}>Obligative</td>
                                <td style={{ border: '1px solid grey', padding: '8px' }}>10</td>
                                <td style={{ border: '1px solid grey', padding: '8px' }}>A</td>
                                <td style={{ border: '1px solid grey', padding: '8px' }}>Rregullt</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid grey', padding: '8px' }}>40CS1150</td>
                                <td style={{ border: '1px solid grey', padding: '8px' }}>Algorithms</td>
                                <td style={{ border: '1px solid grey', padding: '8px' }}>5.00</td>
                                <td style={{ border: '1px solid grey', padding: '8px' }}>Obligative</td>
                                <td style={{ border: '1px solid grey', padding: '8px' }}>10</td>
                                <td style={{ border: '1px solid grey', padding: '8px' }}>A</td>
                                <td style={{ border: '1px solid grey', padding: '8px' }}>Rregullt</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid grey', padding: '8px' }}>40CS1150</td>
                                <td style={{ border: '1px solid grey', padding: '8px' }}>Algorithms</td>
                                <td style={{ border: '1px solid grey', padding: '8px' }}>5.00</td>
                                <td style={{ border: '1px solid grey', padding: '8px' }}>Obligative</td>
                                <td style={{ border: '1px solid grey', padding: '8px' }}>10</td>
                                <td style={{ border: '1px solid grey', padding: '8px' }}>A</td>
                                <td style={{ border: '1px solid grey', padding: '8px' }}>Rregullt</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid grey', padding: '8px' }}>40CS1150</td>
                                <td style={{ border: '1px solid grey', padding: '8px' }}>Algorithms</td>
                                <td style={{ border: '1px solid grey', padding: '8px' }}>5.00</td>
                                <td style={{ border: '1px solid grey', padding: '8px' }}>Obligative</td>
                                <td style={{ border: '1px solid grey', padding: '8px' }}>10</td>
                                <td style={{ border: '1px solid grey', padding: '8px' }}>A</td>
                                <td style={{ border: '1px solid grey', padding: '8px' }}>Rregullt</td>
                            </tr>
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
            </Col>
        </Row>
        </div>
        </>
    )
}

export default Grupet;