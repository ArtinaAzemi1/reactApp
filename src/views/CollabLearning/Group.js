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
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faPenToSquare,
  faPlus,
  faClose,
  faXmark,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import AddStudent from "./AddStudent.js";
import EdittGroup from "./EdittGroup.js";


const Group =() => {

    const [show, setShow] = useState(false);

    const [search, setSearch] = useState ('');

    const [shto, setShto] = useState(false);
    const [edito, setEdito] = useState(false);
    const [fshij, setFshij] = useState(false);

    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShto(true);

    const [groupId, setGroupId] = useState(0);
    const [groupName, setGroupName] = useState('')
    const [year, setYear] = useState('')
    const [capacity, setCapacity] = useState('')
    const [refreshD, setRefreshD] = useState("");
    const [groupsD, setGroupsD] = useState([])
    const [group, setGroup] = useState([]);

    useEffect(() => {
        const getGroupsD = async () => {
            try {
                const groupsD = await axios.get(
                    "https://localhost:7110/api/Group"
                );
                setGroupsD(groupsD.data);
            }
            catch (err) {
                console.log(err);
            }
        };
      
        getGroupsD();
      }, [refreshD]);
  
      useEffect(() => {
        const getGroupsD = async () => {
            try {
                const groupsD = await axios.get(
                    "https://localhost:7110/api/Group"
                );
                setGroupsD(groupsD.data);
            }
            catch (err) {
                console.log(err);
            }
        };
      
        getGroupsD();
      }, [refreshD]);
  
      const handleGroupNameChange = (value) => {
        setGroupName(value);
      };
      const handleYearChange = (value) => {
        setYear(value);
      };
      const handleCapacityChange = (value) => {
        setCapacity(value);
      };
    
      const handleGroupName = (value) => {
        setGroup((prev) => ({ ...prev, name: value }));
      };
    
      const handleYear = (value) => {
        setGroup((prev) => ({ ...prev, year: value }));
      };
      const handleCapacity = (value) => {
        setGroup((prev) => ({ ...prev, capacity: value }));
      };
  
      const handleEdit = (groupdId) => {
        setEdito(true);
        setGroupId(groupdId);
      };
  
      const handleEdito = () => setEdito(false); 
    
      const handleDelete = (groupdId) => {
        setFshij(true);
        setGroupId(groupdId);
      };

      const handleSave = async () => {
        try {
          await axios.put(`https://localhost:7110/api/Group/${groupId}`, {
            groupId,
            groupName,
            year,
            capacity,
          });
          //perditesoTeDhenat(); // Për rifreskimin e të dhënave
          //hide(); // Mbyll modalin
        } catch (err) {
          console.error("Gabim gjatë përditësimit të grupit:", err);
        }
      };
  
      const handleDeleteGroup = async (groupId) => {
        console.log("Deleting group with ID:", groupId); 
        try {
          await axios.delete(`https://localhost:7110/api/Group/${groupId}`).then(() => {
            setFshij(false);
            setRefreshD(Date.now());
          })
        } catch (e) {
         
        }
      };
  

    const tableStyle = {
      overflowX: 'auto',
      display: 'block'
    };
  
    const minWidthStyle = {
      minWidth: '2000px' // Përshtati sipas nevojës për gjerësi të tabelës
    };

    return (
        <>
      <div className="content">
      <ToastContainer/>
      {edito && (
            <EdittGroup
            show={handleShow}
            hide={() => setEdito(false)}
            groupId={groupId}
            />
        )}
        {fshij && (
        <Modal show={fshij} onHide={() => setFshij(false)}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "red" }}>Delete Group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Are you sure you want to delete this Group?</h6>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setFshij(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => handleDeleteGroup(groupId)}>
              Delete Group
            </Button>
          </Modal.Footer>
        </Modal>
        )}
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Group Table</CardTitle>
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
              <Button onClick={handleShow} style={{marginBottom: "20px", marginTop: "20px"}}>Add Group</Button>
              <Container>
                <div style={tableStyle}>
                <Table style={minWidthStyle} responsive>
                  <thead className="text-primary">
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Year</th>
                        <th>Capacity</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                            groupsD.filter((item)=> {return search.toLowerCase() === ''? item : item.groupName.toLowerCase().includes(search.toLowerCase())})
                            .map((item, index)=>{
                                return (
                                    <tr key={item.groupId}>
                                        <td>{index + 1}</td>
                                        <td>{item.groupId}</td>
                                        <td>{item.groupName}</td>
                                        <td>{item.year}</td>
                                        <td>{item.capacity}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={()=> handleEdit(item.groupId)}><FontAwesomeIcon icon={faPenToSquare} /></button> &nbsp;
                                            <button className="btn btn-danger" onClick={()=> handleDelete(item.groupId)}><FontAwesomeIcon icon={faBan} /></button>
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
        <AddStudent
          show={handleShow}
          hide={() => setShto(false)}
          //shfaqmesazhin={() => setShfaqMesazhin(true)}
          perditesoTeDhenat={() => setRefreshD(Date.now())}
          //setTipiMesazhit={setTipiMesazhit}
          //setPershkrimiMesazhit={setPershkrimiMesazhit}
        />
      )}
              </Fragment>
        </div>
        </>
    )
}

export default Group;