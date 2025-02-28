import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';

function AddTeam(props) {
    const [teamName, setTeamName] = useState("");

    const [perditeso, setPerditeso] = useState("");
    const [teams, setTeams] = useState([]);
    const [kontrolloKategorine, setKontrolloKategorine] = useState(false);
    const [konfirmoKategorine, setKonfirmoKategorine] = useState(false);
    const [fushatEZbrazura, setFushatEZbrazura] = useState(false);

    useEffect(() => {
        const vendosKategorite = async () => {
            try {
                const kategorite = await axios.get(
                    `https://localhost:7214/api/Team`,
                );
                setTeams(kategorite.data);

            } catch (err) {
                console.log(err);
            }
        };

        vendosKategorite();
    }, [perditeso]);

    /*const getToken = localStorage.getItem("token");

    const authentikimi = {
        headers: {
            Authorization: `Bearer ${getToken}`,
        },
    };*/

    const handleNameChange = (value) => {
        setTeamName(value);
    };

    function isNullOrEmpty(value) {
        return value === null || value === "" || value === undefined;
    }

    function handleSubmit() {
        axios.post('https://localhost:7214/api/Team', {
            teamName: teamName
        })
            .then((response) => {
                props.perditesoTeDhenat();
                props.largo();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleKontrolli = () => {
        console.log("Kontrollo emrin e ekipit:", teamName);
        if (isNullOrEmpty(teamName)) {
            setFushatEZbrazura(true);
        } else {
            if (konfirmoKategorine === false && teams.filter((item) => item.teamName === teamName).length !== 0) {
                setKontrolloKategorine(true);
            }
            else {
                console.log("Shto ekipin:", teamName);
                handleSubmit();
            }
        }
    };

    return (
        <>
            {fushatEZbrazura &&
                <Modal size="sm" show={fushatEZbrazura} onHide={() => setFushatEZbrazura(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{ color: "red" }} as="h6">Ndodhi nje gabim</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <strong style={{ fontSize: "10pt" }}>Ju lutemi plotesoni te gjitha fushat me <span style={{ color: "red" }}>*</span></strong>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button size="sm" onClick={() => setFushatEZbrazura(false)} variant="secondary">
                            Mbylle <FontAwesomeIcon icon={faXmark} />
                        </Button >
                    </Modal.Footer>

                </Modal>
            }
            {kontrolloKategorine &&
                <Modal size="sm" show={kontrolloKategorine} onHide={() => setKontrolloKategorine(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title as="h6">Konfirmo vendosjen</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span style={{ fontSize: "10pt" }}>
                            Nje team me te njejtin emer ekziston ne sistem!
                        </span>
                        <br />
                        <strong style={{ fontSize: "10pt" }}>
                            A jeni te sigurt qe deshironi te vazhdoni?
                        </strong>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button size="sm" variant="secondary" onClick={() => setKontrolloKategorine(false)}>
                            Korrigjo <FontAwesomeIcon icon={faXmark} />
                        </Button>
                        <Button
                            size="sm"
                            variant="warning"
                            onClick={() => { handleSubmit(); }}
                        >
                            Vazhdoni
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
            <Modal className="modalEditShto" show={props.shfaq} onHide={() => props.largo()}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Team</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Team Name<span style={{ color: "red" }}>*</span></Form.Label>
                            <Form.Control
                                onChange={(e) => handleNameChange(e.target.value)}
                                value={teamName}
                                type="text"
                                placeholder="Team Name"
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.largo()}>
                        Anulo <FontAwesomeIcon icon={faXmark} />
                    </Button>
                    <Button
                        className="Butoni"
                        onClick={handleKontrolli}
                    >
                        Add Team <FontAwesomeIcon icon={faPlus} />
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddTeam;