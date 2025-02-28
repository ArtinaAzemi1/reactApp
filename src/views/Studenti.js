import React, { useState, useEffect, Fragment } from "react";
import {
  Card, CardHeader, CardBody, CardTitle, Table, Row, Col,
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Container, ButtonToolbar, Form, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddStudent from './AddStudent';
import Message from './Message.js';
import ViewStudent from "./ViewStudent";

const Studenti = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [departments, setDepartments] = useState([]); // New state for departments
  const [loading, setLoading] = useState(true);
  const [showView, setShowView] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleView = () => setShowView(true);
  const handleCloseView = () => setShowView(false);

  const getData = () => {
    axios.get("http://localhost:5034/api/Student")
      .then((result) => {
        setData(result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDepartments = () => {
    axios.get("http://localhost:5034/api/Department")
      .then((result) => {
        setDepartments(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
    getDepartments(); // Fetch departments when component mounts
  }, []);

  const handleEdit = (id) => {
    handleShow();
    axios.get(`http://localhost:5034/api/Student/${id}`)
      .then((result) => {
        setName(result.data.name);
        setSurname(result.data.surname);
        setBirthDate(result.data.birthDate);
        setGender(result.data.gender);
        setCity(result.data.city);
        setEmail(result.data.email);
        setDepartmentId(result.data.departmentId);
        setId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const response = await fetch(`http://localhost:5034/api/Student/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Failed to delete student');
        }

        toast.success('Student has been deleted');
        getData();
      } catch (error) {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  const handleUpdate = () => {
    const url = `http://localhost:5034/api/Student/${id}`;
    const data = {
      name,
      surname,
      birthDate,
      gender,
      city,
      email,
      departmentId,
    };

    fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update student');
        }
        handleClose();
        getData();
        clearEditData();
        toast.success('Student has been updated!');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const clearEditData = () => {
    setName('');
    setSurname('');
    setBirthDate('');
    setGender('');
    setCity('');
    setEmail('');
    setDepartmentId('');
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const perditesoTeDhenat = (newStudent) => {
    setData((prevStudents) => [...prevStudents, newStudent]);
  };

  const handleViewStudent = (id) => {
    handleView();
    axios.get(`http://localhost:5034/api/Student/${id}`)
      .then((result) => {
        setName(result.data.name);
        setSurname(result.data.surname);
        setBirthDate(result.data.birthDate);
        setGender(result.data.gender);
        setCity(result.data.city);
        setEmail(result.data.email);
        setDepartmentId(result.data.departmentId);
        setId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="content">
      {shfaqMesazhin && (
        <Message
          setShfaqMesazhin={setShfaqMesazhin}
          pershkrimi={pershkrimiMesazhit}
          tipi={tipiMesazhit}
        />
      )}
      <ToastContainer />
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Students Table</CardTitle>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Birth Date</th>
                    <th>Gender</th>
                    <th>City</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.length > 0
                    ? data.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.surname}</td>
                        <td>{item.birthDate}</td>
                        <td>{item.gender}</td>
                        <td>{item.city}</td>
                        <td>{item.email}</td>
                        <td>{item.department.name}</td>
                        <td>
                          <Button className="btn btn-primary" onClick={() => handleEdit(item.id)}>Edit</Button> &nbsp;
                          <Button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</Button> &nbsp;
                          <Button className="btn btn-info" onClick={() => handleViewStudent(item.id)}>View</Button>
                        </td>
                      </tr>
                    ))
                    : 'Loading...'}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Button onClick={handleShow}>Add Student</Button>
      <AddStudent
        show={show}
        hide={handleClose}
        shfaqmesazhin={() => setShfaqMesazhin(true)}
        perditesoTeDhenat={() => setPerditeso(Date.now())}
        setTipiMesazhit={setTipiMesazhit}
        setPershkrimiMesazhit={setPershkrimiMesazhit}
        departments={departments} // Pass departments to AddStudent
      />
      <ViewStudent
        show={showView}
        hide={handleCloseView}
        id={id}
        name={name}
        surname={surname}
        birthDate={birthDate}
        gender={gender}
        city={city}
        email={email}
        departmentId={departmentId}
      />
    </div>
  );
};

export default Studenti;