/*import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
} from "reactstrap";

import axios from "axios";
import {Button} from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faPenToSquare,
  faPlus,
  faClose,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const Transkripta = () => {
    const [showTable, setShowTable] = useState(false); // Gjendja për të menaxhuar dukshmërinë e tabelës

    const handleGenerateTranscript = () => {
        setShowTable(true); // Shfaq tabelën kur të klikohet butoni
    };

    const [courseId, setCourseId] = useState(0);
    const [name, setName] = useState("")
    const [semester, setSemester] = useState(0)
    const [ects, setEcts] = useState(0)
    const [coursesD, setCoursesD]= useState([]);
    const [course, setCourse] = useState([]);

    const [gradeId, setGradeId] = useState(0);
    const [value, setValue] = useState(0)
    const [letterGrade, setLetterGrade] = useState('')
    const [status, setStatus] = useState('')
    const [dateOfGrading, setDateOfGrading] = useState('')
    const [gradesD, setGradesD]= useState([]);
    const [grade, setGrade] = useState([]);

    


    useEffect(() => {
        const getCoursesD = async () => {
            try {
                const coursesD = await axios.get(
                    "https://localhost:7214/api/Course"
                );
                console.log(coursesD.data); 
                setCoursesD(coursesD.data);
            }
            catch (err) {
                console.log(err);
            }
        };

        getCoursesD();
    }, [refreshD]);

    useEffect(() => {
        const getGradesD = async () => {
            try {
                const gradesD = await axios.get(
                    "https://localhost:7214/api/Grade"
                );
                setGradesD(gradesD.data);
            }
            catch (err) {
                console.log(err);
            }
        };

        getGradesD();
    }, [refreshD]);

    return (
        <>
            <div className="content">
                <ToastContainer />
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">
                                    Transcript
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table border="1">
                                    <thead className="trancriptHead">
                                        <tr>
                                            <th style={{ border: '1px solid black', borderRadius: "50px", padding: '8px' }}>Field Study</th>
                                            <th style={{ border: '1px solid black', borderRadius: "50px", padding: '8px' }}>Level</th>
                                            <th style={{ border: '1px solid black', borderRadius: "50px", padding: '8px' }}>Status</th>
                                            <th style={{ border: '1px solid black', borderRadius: "50px", padding: '8px' }}>Transcript</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={{ border: '1px solid grey', padding: '8px' }}>Computer Science and Engineering</td>
                                            <td style={{ border: '1px solid grey', padding: '8px' }}>Bachelor</td>
                                            <td style={{ border: '1px solid grey', padding: '8px' }}>Active</td>
                                            <td style={{ border: '1px solid grey', padding: '8px' }}>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={handleGenerateTranscript} // Vendos funksionin këtu
                                                >
                                                    Generate Transcript
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                            <hr style={{ margin: '0 20px', borderTop: '1px solid black' }} />
                            {showTable && ( // Kontrollo nëse tabelës së dytë i duhet të shfaqet
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
                                            {
                                                gradesD.filter((item)=> {return search.toLowerCase() === ''? item : item.name.toLowerCase().includes(search.toLowerCase()) || item.city.toLowerCase().includes(search.toLowerCase())})
                                                 .map((item, index)=>{
                                                     return (
                                                         <tr key={item.gradeId}>
                                                             <td>{index + 1}</td>
                                                             <td>{item.gradeId}</td>
                                                             <td>{item.value}</td>
                                                             <td>{item.letterGrade}</td>
                                                             <td>{item.status}</td>
                                                             <td>{item.dateOfGrading}</td>
                                                             <td>
                                                                 <button className="btn btn-primary" onClick={()=> handleEdit(item.gradeId)}><FontAwesomeIcon icon={faPenToSquare} /></button> &nbsp;
                                                                 <button className="btn btn-danger" onClick={()=> handleDelete(item.gradeId)}><FontAwesomeIcon icon={faBan} /></button>
                                                             </td>
                                                       </tr>
                                                     )
                                                 })
                                             }
                                        </tbody>
                                    </Table>
                                </CardBody>
                            )}
                        </Card>
                        <Button variant="secondary" style ={{marginLeft:"20px"}} onClick={()=>setShowTable(false)}><FontAwesomeIcon icon={faXmark} /></Button>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Transkripta;*/

import React, { useState, useEffect } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
} from "reactstrap";
import axios from "axios";
import { Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const Transkripta = () => {
    const [showTable, setShowTable] = useState(false);
    const [coursesD, setCoursesD] = useState([]);
    const [gradesD, setGradesD] = useState([]);
    const [refreshD, setRefreshD] = useState("");

    const handleGenerateTranscript = () => {
        setShowTable(true);
    };

    useEffect(() => {
        const getCoursesD = async () => {
            try {
                const response = await axios.get("https://localhost:7214/api/Course");
                setCoursesD(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        const getGradesD = async () => {
            try {
                const response = await axios.get("https://localhost:7214/api/Grade");
                setGradesD(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        getCoursesD();
        getGradesD();
    }, [refreshD]);

    return (
        <>
            <div className="content">
                <ToastContainer />
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Transcript</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table border="1">
                                    <thead className="trancriptHead">
                                        <tr>
                                            <th style={{ border: '1px solid black', borderRadius: "50px", padding: '8px' }}>Field Study</th>
                                            <th style={{ border: '1px solid black', borderRadius: "50px", padding: '8px' }}>Level</th>
                                            <th style={{ border: '1px solid black', borderRadius: "50px", padding: '8px' }}>Status</th>
                                            <th style={{ border: '1px solid black', borderRadius: "50px", padding: '8px' }}>Transcript</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={{ border: '1px solid grey', padding: '8px' }}>Computer Science and Engineering</td>
                                            <td style={{ border: '1px solid grey', padding: '8px' }}>Bachelor</td>
                                            <td style={{ border: '1px solid grey', padding: '8px' }}>Active</td>
                                            <td style={{ border: '1px solid grey', padding: '8px' }}>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={handleGenerateTranscript}
                                                >
                                                    Generate Transcript
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                            <hr style={{ margin: '0 20px', borderTop: '1px solid black' }} />
                            {showTable && coursesD.length > 0 && gradesD.length > 0 && (
                                <CardBody>
                                {/* Tabela e Kurseve */}
                                <Table border="1">
                                    <thead>
                                        <tr>
                                            <th>Course Name</th>
                                            <th>ECTS</th>
                                            <th>Grade Value</th>
                                            <th>Letter Grade</th>
                                            <th>Status</th>
                                            <th>Date of Grading</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {coursesD.map((course) => {
                                        const grade = gradesD.find((grade) => grade.gradeId === course.gradeId);
                                        return grade ? (
                                            <tr key={`${grade.gradeId}-${course.courseId}`}>
                                                <td>{course.code}</td>
                                                <td>{course.name}</td>
                                                <td>{course.ects}</td>
                                                <td>{course.category}</td>
                                                <td>{grade.value}</td>
                                                <td>{grade.letterGrade}</td>
                                                <td>{grade.status}</td>
                                            </tr>
                                        ) : null;
                                    })}
                                    </tbody>
                                </Table>
                            </CardBody>
                            )}
                        </Card>
                        <Button variant="secondary" style={{ marginLeft: "20px" }} onClick={() => setShowTable(false)}>
                            <FontAwesomeIcon icon={faXmark} />
                        </Button>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Transkripta;