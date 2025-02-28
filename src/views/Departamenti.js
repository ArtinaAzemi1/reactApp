import React, { useState, useEffect, Fragment } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from 'reactstrap';
import { Button, Modal, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const Departamenti = () => {
  const [show, setShow] = useState(false);
  const [shto, setShto] = useState(false);
  const [edito, setEdito] = useState(false);
  const [fshij, setFshij] = useState(false);
  const [refreshD, setRefreshD] = useState('');

  const [departmentId, setDepartmentId] = useState(0);
  const [departmentName, setDepartmentName] = useState('');
  const [deanName, setDeanName] = useState('');
  const [stafCount, setStafCount] = useState(0);
  const [departmentsD, setDepartmentsD] = useState([]);
  const [department, setDepartment] = useState({});

  const handleEdit = (departmentId) => {
    setEdito(true);
    setDepartmentId(departmentId);
  };

  const handleDelete = (departmentId) => {
    setFshij(true);
    setDepartmentId(departmentId);
  };

  useEffect(() => {
    const getDepartmentsD = async () => {
      try {
        const response = await axios.get('https://localhost:7214/api/Department');
        setDepartmentsD(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getDepartmentsD();
  }, [refreshD]);

  const handleAddDepartment = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:7214/api/Department', {
        departmentName,
        deanName,
        stafCount: parseInt(stafCount),
      });
      setShto(false);
      setRefreshD(Date.now());
      setDepartmentName('');
      setDeanName('');
      setStafCount(0);
      toast.success('Department has been added!');
    } catch (error) {
      console.error("Error response:", error.response);
      if (error.response && error.response.data) {
        toast.error(`Failed to add department: ${error.response.data.message}`);
      } else {
        toast.error('Failed to add department. Please try again.');
      }
    }
  };

  const handleUpdateDepartment = async (departmentId) => {
    try {
      await axios.put(`https://localhost:7214/api/Department/${departmentId}`,
        department
      )
      setEdito(false);
      setRefreshD(Date.now());
      toast.success('Department has been updated!');
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteDepartment = async () => {
    try {
      await axios.delete(`https://localhost:7214/api/Department/${departmentId}`);
      setFshij(false);
      setRefreshD(Date.now());
      toast.success('Department has been deleted');
    } catch (e) {
      toast.error('Failed to delete department');
    }
  };

  return (
    <>
      <div className="content">
        <ToastContainer />
        {edito && (
          <Modal show={edito} onHide={() => setEdito(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Department</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="DepartmentName">
                  <Form.Label>Department Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={department.name}
                    onChange={(e) => setDepartment({ ...department, name: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="DeanName">
                  <Form.Label>Dean Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={department.deanName}
                    onChange={(e) => setDepartment({ ...department, deanName: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="StafCount">
                  <Form.Label>Staff Count</Form.Label>
                  <Form.Control
                    type="number"
                    value={department.stafCount}
                    onChange={(e) => setDepartment({ ...department, stafCount: parseInt(e.target.value) })}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setEdito(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateDepartment}>
                Edit Department
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        {fshij && (
          <Modal show={fshij} onHide={() => setFshij(false)}>
            <Modal.Header closeButton>
              <Modal.Title style={{ color: 'red' }}>Delete Department</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h6>Are you sure you want to delete this department?</h6>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setFshij(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteDepartment}>
                Delete Department
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Department Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Button onClick={() => setShto(true)} style={{ marginBottom: '20px', marginTop: '20px' }}>
                  Add Department
                </Button>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>#</th>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Dean Name</th>
                      <th>Staff Count</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentsD && departmentsD.length > 0 ? (
                      departmentsD.map((item, index) => (
                        <tr key={item.departmentId}>
                          <td>{index + 1}</td>
                          <td>{item.departmentId}</td>
                          <td>{item.departmentName}</td>
                          <td>{item.deanName}</td>
                          <td>{item.stafCount}</td>
                          <td>
                            <Button className="btn btn-primary" onClick={() => handleEdit(item.departmentId)}>
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </Button>{' '}
                            &nbsp;
                            <Button className="btn btn-danger" onClick={() => handleDelete(item.departmentId)}>
                              <FontAwesomeIcon icon={faBan} />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6">No departments available</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Fragment>
          {shto && (
            <Modal show={shto} onHide={() => setShto(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Add Department</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleAddDepartment}>
                  <Form.Group controlId="DepartmentName">
                    <Form.Label>Department Name</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Name..."
                      value={departmentName}
                      onChange={(e) => setDepartmentName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="DeanName">
                    <Form.Label>Dean Name</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Dean Name..."
                      value={deanName}
                      onChange={(e) => setDeanName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="StafCount">
                    <Form.Label>Staff Count</Form.Label>
                    <Form.Control
                      type="number"
                      required
                      placeholder="Staff count..."
                      value={stafCount}
                      onChange={(e) => setStafCount(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShto(false)}>
                  Cancel
                </Button>
                <Button type="submit" onClick={handleAddDepartment}>
                  Add Department
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </Fragment>
      </div>
    </>
  );
};

export default Departamenti;