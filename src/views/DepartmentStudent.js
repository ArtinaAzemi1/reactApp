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
//import AddStudent from './AddStudent'
import Message from './Message.js'

const Department =() => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    const[name, setName] = useState('')
    const[deanName, setDeanName] = useState('')
    const[stafCount, setStafCount] = useState('')
    const[departmentId, setDepartmentId] = useState();

    const [perditeso, setPerditeso] = useState("");
    const [shfaqMesazhin, setShfaqMesazhin] = useState(false);
    const [tipiMesazhit, setTipiMesazhit] = useState("success");
    const [pershkrimiMesazhit, setPershkrimiMesazhit] = useState("");
    const [edito, setEdito] = useState(false);

    const[editDepartmentId, setEditDepartmentId] = useState('');
    const[editName, setEditName] = useState('')
    const[editDeanName, setEditDeanName] = useState('')
    const[editStafCount, setEditStafCount] = useState('')

    const empdata = [
        {
            departmentId: 1,
            name : 'Computer Science and Engineering',
            deanName : 'Filan Fisteku',
            stafCount : 40,
        },
        {
            departmentId: 1,
            name : 'Mecatronics',
            deanName : 'Fitim Mustafa',
            stafCount : 30,
        }
    ]

    const[data, setData] = useState([]);
    const [editData, setEditData] = useState({
        departmentId: '',
        name: '',
        deanName: '',
        stafCount: ''
    });

    const getData = () => {
        axios.get('http://localhost:5034/api/Department').then((result) =>{
            setData(result.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=> {
        getData();
    },[])

    //const perditesoTeDhenat = (newDepartment) => {
      //  setData(prevDepartments => [...prevDepartments, newDepartment]);
      //};

    const handleEdito = (departmentId) => {
        setEdito(true);
        setDepartmentId(departmentId);
    };

    const handleEditoMbyll = () => setEdito(false);

    const handleEdit =(departmentId) => {
        handleShow();
        axios.get('http://localhost:5034/api/Department/${departmentId}').then((result)=>{
            setEditName(result.data.name);
            setEditDeanName(result.data.deanName);
            setEditStafCount(result.data.stafCount);
            setEditDepartmentId(departmentId);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

   /* const handleDelete =(departmentId) => {
        if(window.confirm("Are you sure you want to delete this department ?")) {
            axios.delete('http://localhost:5034/api/Department/${departmentId}').then((result)=>{
                if(result.status === 200) {
                    toast.success('Department has been deleted');
                    getData();
                }
            })
            .catch((error)=>{
                toast.error(error);
            })
        }
    }*/

    const handleDelete = async (departmentId) => {
        if(window.confirm("Are you sure you want to delete this department?")) {
            try {
                const response = await fetch(`http://localhost:5034/api/Department/${departmentId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (!response.ok) {
                    throw new Error('Failed to delete department');
                }
    
                toast.success('Department has been deleted');
                getData();
            } catch (error) {
                toast.error(`Error: ${error.message}`);
            }
        }
    }

    const handleUpdate = () => {
        const url = `http://localhost:5034/api/Department/${editDepartmentId}`;
        const data = {
            name: editName,
            deanName: editDeanName,
            stafCount: editStafCount
        };
    
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update department');
            }
            handleClose();
            getData();
            clearEditData();
            toast.success('Department has been updated!');
        })
        .catch(error => {
            toast.error(error.message);
        });
    }
    
    const clearEditData = () => {
        setEditName('');
        setEditDeanName('');
        setEditStafCount('');
        setEditDepartmentId('');
    }

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const perditesoTeDhenat = (newDepartment) => {
        setData(prevDepartments => [...prevDepartments, newDepartment]);
    };

    return (
      <div className="content">
        {shfaqMesazhin && (
        <Message
          setShfaqMesazhin={setShfaqMesazhin}
          pershkrimi={pershkrimiMesazhit}
          tipi={tipiMesazhit}
        />)}

        <ToastContainer/>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Simple Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Dean Name</th>
                        <th>Staf Count</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                           data && data.length > 0 ?
                            data.map((item, index)=>{
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.departmentId}</td>
                                        <td>{item.name}</td>
                                        <td>{item.deanName}</td>
                                        <td>{item.stafCount}</td>
                                        <td>
                                            <Button className="btn btn-primary" onClick={()=> handleEdito(item.departmentId)}>Edit</Button> &nbsp;
                                            <button className="btn btn-danger" onClick={()=> handleDelete(item.departmentId)}>Delete</button>
                                        </td>
                                  </tr>
                                )
                            })
                            :
                            'Loading...'
                        }
                    </tbody>
                  </Table>
              </CardBody>
            </Card>
          </Col>
          </Row>

          
          <Button onClick={handleShow}>Add Department</Button>
        
        </div>
    )
}

export default Department;