import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPlayer = (props) => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState(0)
  const [birthYear, setBirthYear] = useState('')
  const [teams, setTeamsD] = useState([]);
  const [teamId, setTeamId] = useState('');

  const [players, setPlayers] = useState([]);
  const [refreshD, setRefreshD] = useState("");

  const [fushatEZbrazura, setFushatEZbrazura] = useState(false);
  const [controlPlayer, setControlPlayer] = useState(false);

  // Fetch students and departments on component mount or refresh
  useEffect(() => {
    const fetchData = async () => {
      try {
        const playersResponse = await axios.get("https://localhost:7214/api/Player");
        setPlayers(playersResponse.data);

        const teamsResponse = await axios.get('https://localhost:7214/api/Team');
        setTeamsD(teamsResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [refreshD]);

  const handleSubmit = async () => {
    try {
      await axios.post("https://localhost:7214/api/Player", {
        name,
        number,
        birthYear: birthYear ? new Date(birthYear).toISOString() : null,
        teamId
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      toast.success('Player has been added!');
      props.perditesoTeDhenat();
      props.hide();
    } catch (error) {
      console.error(error);
      toast.error('Failed to add player');
    }
  };

  const handleControl = (e) => {
    e.preventDefault();

    if (
      !name || !number || !birthYear || !teamId
    ) {
      setFushatEZbrazura(true);
    } else if (!controlPlayer && players.some((player) => player.name === name)) {
      setControlPlayer(true);
    } else {
      handleSubmit();
    }
  };

  return (
    <>
      {fushatEZbrazura &&
        <Modal size="sm" show={fushatEZbrazura} onHide={() => setFushatEZbrazura(false)}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "red" }} as="h6">There's been a mistake...</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <strong style={{ fontSize: "10pt" }}>Please fill all the required fields!!</strong>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" onClick={() => setFushatEZbrazura(false)} variant="secondary">
              Close <FontAwesomeIcon icon={faXmark} />
            </Button >
          </Modal.Footer>
        </Modal>
      }
      {controlPlayer &&
        <Modal size="sm" show={controlPlayer} onHide={() => setControlPlayer(false)}>
          <Modal.Header closeButton>
            <Modal.Title as="h6">Confirm input</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span style={{ fontSize: "10pt" }}>
              A player with the same name happens to be on the system!
            </span>
            <br />
            <strong style={{ fontSize: "10pt" }}>
              Are you sure you want to continue?
            </strong>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={() => setControlPlayer(false)}>
              Correct <FontAwesomeIcon icon={faXmark} />
            </Button>
            <Button
              size="sm"
              variant="warning"
              onClick={() => { handleSubmit(); }}
            >
              Continue
            </Button>
          </Modal.Footer>
        </Modal>
      }
      <Modal className="modalEditShto" show={props.show} onHide={props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Add Player</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleControl}>
            <Form.Group className="mb-3" controlId="studentName">
              <Form.Label>Player Name<span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Name..."
                autoFocus
              />
            </Form.Group>
            <Form.Group controlId="studentSurname">
              <Form.Label>Player Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Number..."
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="studentBirthdate">
              <Form.Label>Student Date of Birth</Form.Label>
              <Form.Control
                type="date"
                placeholder="Birthdate..."
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="studentDepartment">
              <Form.Label>Team<span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Select
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                required
              >
                <option value="" hidden>Select Team</option>
                {teams.map((item) => (
                  <option key={item.teamId} value={item.teamId}>{item.teamName}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Button variant="info" type="submit">
                Add New Team
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.hide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default AddPlayer;