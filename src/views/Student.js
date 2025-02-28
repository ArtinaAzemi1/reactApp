import React, {useState, useEffect, Fragment} from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {ButtonToolbar, Form} from 'react-bootstrap';
//import AddStudent from './AddStudent'

const Student =() => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[name, setName] = useState('')
    const[surname, setSurname] = useState('')
    const[birthDate, setBirthDate] = useState('')
    const[gender, setGender] = useState('')
    const[city, setCity] = useState('')
    const[email, setEmail] = useState('')

    const[editId, setEditId] = useState('');
    const[editName, setEditName] = useState('')
    const[editSurname, setEditSurname] = useState('')
    const[editBirthDate, setEditBirthDate] = useState('')
    const[editGender, setEditGender] = useState('')
    const[editCity, setEditCity] = useState('')
    const[editEmail, setEditEmail] = useState('')

    

    const[data, setData] = useState([]);

    //useEffect(()=> {
    //    getData();
    //},[])


    /*const getData = async () => {
        try {
            const result = await axios.get('http://localhost:5034/api/Student');
            setData(result.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }*/

    useEffect(()=> {
        getData();
    },[])

    const getData = () => {
        axios.get('http://localhost:5034/api/Student').then((result) =>{
            setData(result.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    //suseEffect(()=> {
    //s    getData();
    //s},[])

    /*const [loading, setLoading] = useState(false);
    useEffect(() => {
        const shfaqStudentet = async () => {
            try {
                setLoading(true);
                const studenti = await axios.get("https://localhost:7285/api/Kompania/shfaqKompanit", authentikimi);
                setKompanit(kompania.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        shfaqKompanit();
    }, [perditeso]);*/

    const handleEdit =(id) => {
        handleShow();
        axios.get('http://localhost:5034/api/Student/${id}').then((result)=>{
            setEditName(result.data.name);
            setEditSurname(result.data.surname);
            setEditBirthDate(result.data.birthDate);
            setEditGender(result.data.gender);
            setEditCity(result.data.city);
            setEditEmail(result.data.email);
            setEditId(id);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const handleDelete =(id) => {
        if(window.confirm("Are you sure you want to delete this student ?") == true) {
            axios.delete('http://localhost:5034/api/Student/${id}').then((result)=>{
                if(result.status === 200) {
                    toast.success('Student has been deleted');
                    getData();
                }
            })
            .catch((error)=>{
                toast.error(error);
            })
        }
    }

    const handleUpdate =()=> {
        const url = 'http://localhost:5034/api/Student/${editId}';
        const data = {
            "id": editId,
            "name": editName,
            "surname": editSurname,
            "birthDate": editBirthDate,
            "gender": editGender,
            "city": editCity,
            "email": editEmail
        }

        axios.put(url, data).then((result) => {
            handleClose();
            getData();
            clear();
            toast.success('Student has been updated !');
        }).catch((error)=>{
            toast.error(error);
        })
    }

    const handleSave =() => {
        const url = 'http://localhost:5034/api/Student';
        const data = {
            "name": name,
            "surname": surname,
            "birthDate": birthDate,
            "gender": gender,
            "city": city,
            "email": email
        }

        axios.post(url, data).then((result) => {
            getData();
            clear();
            toast.success('Student has been added !');
        }).catch((error)=>{
            toast.error(error);
        })
    }

    const clear = () => {
        setName('');
        setSurname('');
        setBirthDate('');
        setGender('');
        setCity('');
        setEmail('');
        setEditName('');
        setEditSurname('');
        setEditBirthDate('');
        setEditGender('');
        setEditCity('');
        setEditEmail('');
        setEditId('');
    }

    //const handleActiveChange =(e) => {
    //    if(e.target.value) {
    //        setEmail("");
    //    }
    //    else {
    //        setEmail("");
    //    }
    //}
//
    //const handleEditActiveChange =(e) => {
    //    if(e.target.value) {
    //        setEditEmail("");
    //    }
    //    else {
    //        setEditEmail("");
    //    }
    //}

    //const express = require('express');
    //const cors = require('cors');
    //
    //const app = express();
    //
    //// Allow requests from all origins
    //app.use(cors());
    //
    //// Or, specify specific origins
    //app.use(cors({
    //  origin: 'http://localhost:3000' // Replace with your client's domain
    //}));
    //
    //// Your other route handlers and middleware
    //
    //app.listen(5034, () => {
    //  console.log('Server is running on port 5034');
    //});

    return (
        <div className="mt-5 d-grid justify-content-left">
        <Fragment>
            <ToastContainer/>
            <Container>
                <Row>
                  <Col>
                  <input type="text" className="form-control" placeholder="Enter Name"
                  value= {name} onChange={(e)=> setName(e.target.value)} />
                  </Col>
                  <Col>
                  <input type="text" className="form-control" placeholder="Enter Surname"
                  value= {surname} onChange={(e)=> setSurname(e.target.value)} />
                  </Col>
                  <Col>
                  <input type="text" className="form-control" placeholder="Enter BirthDate"
                  value= {birthDate} onChange={(e)=> setBirthDate(e.target.value)} />
                  </Col>
                  <Col>
                  <input type="text" className="form-control" placeholder="Enter Gender"
                  value= {gender} onChange={(e)=> setGender(e.target.value)} />
                  </Col>
                  <Col>
                  <input type="text" className="form-control" placeholder="Enter City"
                  value= {city} onChange={(e)=> setCity(e.target.value)} />
                  </Col>
                  <Col>
                  <input type="text" className="form-control" placeholder="Enter Email"
                  value= {email} onChange={(e)=> setEmail(e.target.value)} />
                  </Col>
                  <Col>
                  <Button classNme="btn btn-primary" onClick={() => handleSave()}> Submit</Button>
                  </Col>
                </Row>
            </Container>
    <br/>
             <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>BirthDate</th>
                        <th>Gender</th>
                        <th>City</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                           data && data.length > 0 ?
                            data.map((item, index)=>{
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.surname}</td>
                                        <td>{item.birthDate}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.city}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={()=> handleEdit(item.id)}>Edit</button> &nbsp;
                                            <button className="btn btn-danger" onClick={()=> handleDelete(item.id)}>Delete</button>
                                        </td>
                                  </tr>
                                )
                            })
                            :
                            "Loading"
                        }
                    </tbody>
                  </Table>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                            <Modal.Title>Modify / Update Student</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Col>
                            <Col>
                            <input type="text" className="form-control" placeholder="Enter Name"
                            value= {editName} onChange={(e)=> setEditName(e.target.value)} />
                            </Col>
                            <br/>
                            <Col>
                            <input type="text" className="form-control" placeholder="Enter Surname"
                            value= {editSurname} onChange={(e)=> setEditSurname(e.target.value)} />
                            </Col>
                            <br/>
                            <Col>
                            <input type="text" className="form-control" placeholder="Enter BirthDate"
                            value= {editBirthDate} onChange={(e)=> setEditBirthDate(e.target.value)} />
                            </Col>
                            <br/>
                            <Col>
                            <input type="text" className="form-control" placeholder="Enter Gender"
                            value= {editGender} onChange={(e)=> setEditGender(e.target.value)} />
                            </Col>
                            <br/>
                            <Col>
                            <input type="text" className="form-control" placeholder="Enter City"
                            value= {editCity} onChange={(e)=> setEditCity(e.target.value)} />
                            </Col>
                            <br/>
                            <Col>
                            <input type="text" classNme="form-control" placeholder="Enter Email"
                            value= {editEmail} onChange={(e)=> setEditEmail(e.target.value)} />
                            </Col>
                        </Col>
                      </Modal.Body>
                      <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Close
                        </Button>
                        <Button variant="primary" onClick={handleUpdate}>
                              Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
        </Fragment>

        
        </div>
    )
}

export default Student;