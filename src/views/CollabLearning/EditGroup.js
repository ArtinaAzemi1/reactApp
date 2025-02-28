/*import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditGroup(props) {
  const [group, setGroup] = useState({});
  const [groupsD, setGroupsD] = useState({});
  const [controlGroup, setControlGroup] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupsResponse = await axios.get('https://localhost:7110/api/Group');
        setGroupsD(groupsResponse.data);
      } catch (err) {
        console.error('Error fetching groups:', err);
      }
    };

    fetchGroups();
  }, [props.groupId]);

  const handleInputChange = (field, value) => {
    setGroup((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    await axios.put(`https://localhost:7110/api/Group/` + props.groupId, {
            groupName: group.groupName,
            year: group.year,
            capacity: group.capacity,
      })
        .then(x => {
          toast.success('Group has been updated!');
          props.perditesoTeDhenat();
          props.hide();
        })
        .catch(error => {
          toast.error('Failed to update Group');
          console.error('Error saving the product:', error);
          props.perditesoTeDhenat();
        });
  };


  const handleControl = () => {
    if (!group.groupName || !group.year || !group.capacity) {
      toast.error("All fields are required!");
      return;
    }
    
    
    const groupExists = groupsD.some(g => g.groupName === group.groupName);
    if (groupExists) {
      setControlGroup(true); 
    } else {
      handleSubmit(); 
    }
  };


  return (
    <>
      {controlGroup && (
        <Modal size="sm" show={controlGroup} onHide={() => setControlGroup(false)}>
          <Modal.Header closeButton>
            <Modal.Title as="h6">Confirm input</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span style={{ fontSize: "10pt" }}>A group with this name exists!</span>
            <br />
            <strong style={{ fontSize: "10pt" }}>Are you sure you want to continue?</strong>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={() => setControlGroup(false)}>
              Correct <FontAwesomeIcon icon={faXmark} />
            </Button>
            <Button size="sm" variant="warning" onClick={handleSubmit}>
              Go on
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <Modal className="modalEditShto" show={props.show} onHide={props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="Name">
              <Form.Label>Group Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name..."
                value={group.groupName || ''}
                onChange={(e) => handleInputChange('groupName', e.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group controlId="Year">
              <Form.Label>Group Year</Form.Label>
              <Form.Control
                type="text"
                placeholder="Year..."
                value={group.year || ''}
                onChange={(e) => handleInputChange('year', e.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group controlId="Capacity">
              <Form.Label>Group Capacity</Form.Label>
              <Form.Control
                type="text"
                placeholder="Capacity..."
                value={group.capacity || ''}
                onChange={(e) => handleInputChange('capacity', e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.hide}>Cancel</Button>
          <Button onClick={handleControl}>Edit Group</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default EditGroup;*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EdittGroup({ match }) {
  const [group, setGroup] = useState({ groupId: 0, groupName: '', year: 0, capacity: 0 });

  useEffect(() => {
    axios.get(`https://localhost:7110/api/Group/${match.params.groupId}`)
      .then(response => {
        setGroup(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, [match.params.groupId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put(`https://localhost:7110/api/Group/${group.groupId}`, group)
      .then(response => {
        console.log('Group updated successfully: ', response.data);
      })
      .catch(error => {
        console.error('Error updating product: ', error);
      });
  };

  return (
    <div>
      <h2>Edit Group</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={group.groupName} onChange={e => setGroup({ ...group, groupName: e.target.value })} />
        </div>
        <div>
          <label>Price:</label>
          <input type="text" value={group.year} onChange={e => setGroup({ ...group, year: e.target.value })} />
        </div>
        <div>
          <label>Capacity:</label>
          <input type="text" value={group.capacity} onChange={e => setGroup({ ...group, capacity: e.target.value })} />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EdittGroup;