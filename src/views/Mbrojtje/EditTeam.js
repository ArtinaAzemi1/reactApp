import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';

function EditTeam(props) {
    const [team, setTeam] = useState([]);

    const [perditeso, setPerditeso] = useState("");
    const [teams, setTeams] = useState([]);
    const [kontrolloKategorine, setKontrolloKategorine] = useState(false);
    const [konfirmoKategorine, setKonfirmoKategorine] = useState(false);
    const [fushatEZbrazura, setFushatEZbrazura] = useState(false);

    useEffect(() => {
        const vendosKategorite = async () => {
            try {
                const teams = await axios.get(
                    `https://localhost:7214/api/Team`
                );
                setTeams(teams.data);

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

    useEffect(() => {
        const ShfaqKategorine = async () => {
            try {
                const team = await axios.get(`https://localhost:7214/api/Team/${props.teamId}`);
                setTeam(team.data);

            } catch (err) {
                console.log(err);
            }
        };

        ShfaqKategorine();
    }, []);

    const handleEmriChange = (value) => {
        setTeam((prev) => ({ ...prev, teamName: value }));
    };

    function isNullOrEmpty(value) {
        return value === null || value === "" || value === undefined;
    }

    function handleSubmit() {
        axios.put(`https://localhost:7214/api/Team/${team.teamId}`, team)
            .then(x => {
                props.perditesoTeDhenat();
                props.largo();
            })
            .catch(error => {
                console.error('Error saving kategoria:', error);
                props.perditesoTeDhenat();
            });
    }

    const handleKontrolli = () => {
        if (
            isNullOrEmpty(team.teamName)
        ) {
            setFushatEZbrazura(true);
        } else {

            if (konfirmoKategorine == false && teams.filter((item) => item.teamName === team.teamName).length !== 0) {
                setKontrolloKategorine(true);
            }
            else {
                handleSubmit();
            }
        }
    }

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
                        <Modal.Title as="h6">Konfirmo Perditesimin</Modal.Title>
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
            <Modal className="modalEditShto" show={true} onHide={() => props.largo()}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Team</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Team ID</Form.Label>
                            <Form.Control
                                value={team.teamId}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Team Name<span style={{ color: "red" }}>*</span></Form.Label>
                            <Form.Control
                                onChange={(e) => handleEmriChange(e.target.value)}
                                value={team.teamName}
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
                        Edit Team <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditTeam;