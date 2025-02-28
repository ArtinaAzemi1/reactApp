import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddStudent = (props) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');
  const [departments, setDepartmentsD] = useState([]);
  const [departmentId, setDepartmentId] = useState('');

  const [students, setStudents] = useState([]);
  const [refreshD, setRefreshD] = useState("");

  const [fushatEZbrazura, setFushatEZbrazura] = useState(false);
  const [controlStudent, setControlStudent] = useState(false);

  // Fetch students and departments on component mount or refresh
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsResponse = await axios.get("https://localhost:7214/api/Student");
        setStudents(studentsResponse.data);

        const departmentsResponse = await axios.get('https://localhost:7214/api/Department');
        setDepartmentsD(departmentsResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [refreshD]);

  const handleSubmit = async () => {
    try {
      await axios.post("https://localhost:7214/api/Student", {
        name,
        surname,
        birthDate: birthDate ? new Date(birthDate).toISOString() : null,
        gender,
        city,
        email,
        photo,
        departmentId
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      toast.success('Student has been added!');
      props.perditesoTeDhenat();
      props.hide();
    } catch (error) {
      console.error(error);
      toast.error('Failed to add student');
    }
  };

  const handleControl = (e) => {
    e.preventDefault();

    if (
      !name || !surname || !birthDate || !gender || !city || !email || !departmentId
    ) {
      setFushatEZbrazura(true);
    } else if (!controlStudent && students.some((student) => student.name === name)) {
      setControlStudent(true);
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
      {controlStudent &&
        <Modal size="sm" show={controlStudent} onHide={() => setControlStudent(false)}>
          <Modal.Header closeButton>
            <Modal.Title as="h6">Confirm input</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span style={{ fontSize: "10pt" }}>
              A student with the same name happens to be on the system!
            </span>
            <br />
            <strong style={{ fontSize: "10pt" }}>
              Are you sure you want to continue?
            </strong>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={() => setControlStudent(false)}>
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
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleControl}>
            <Form.Group className="mb-3" controlId="studentName">
              <Form.Label>Student Name<span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Name..."
                autoFocus
              />
            </Form.Group>
            <Form.Group controlId="studentSurname">
              <Form.Label>Student Surname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Surname..."
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="studentBirthdate">
              <Form.Label>Student Date of Birth</Form.Label>
              <Form.Control
                type="date"
                placeholder="Birthdate..."
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="studentGender">
              <Form.Label>Student Gender</Form.Label>
              <Form.Select 
                value={gender}
                onChange={(e) => setGender(e.target.value)} 
                required
              >
                <option value="" hidden>Select Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                {/* Add more options if needed */}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="studentCity">
              <Form.Label>Student City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="studentEmail">
              <Form.Label>Student Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="studentDepartment">
              <Form.Label>Department<span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Select
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                required
              >
                <option value="" hidden>Select Department</option>
                {departments.map((item) => (
                  <option key={item.departmentId} value={item.departmentId}>{item.departmentName}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Button variant="info" type="submit">
                Add New Student
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

export default AddStudent;

/*import { React, useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBan, faL } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const AddStudent = (props) => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [gender, setGender] = useState('')
  const [city, setCity] = useState('')
  const [email, setEmail] = useState('')
  const [photo, setPhoto] = useState('')
  const [departments, setDepartmentsD] = useState([]);
  const [departmentId, setDepartmentId] = useState(0);
  const [departmentName, setDepartmentName] = useState("");
  const [students, setStudents] = useState([]);
  const [refreshD, setRefreshD] = useState("");

  const [produktet, setProduktet] = useState([]);
  const [controlStudent, setControlStudent] = useState(false);
  const [confirmStudent, setConfirmStudent] = useState(false);
  const [kontrolloProduktin, setKontrolloProduktin] = useState(false);
  const [konfirmoProduktin, setKonfirmoProduktin] = useState(false);
  const [fushatEZbrazura, setFushatEZbrazura] = useState(false);

  /*useEffect(() => {
    const vendosProduktet = async () => {
      try {
        const produktet = await axios.get(
          `https://localhost:7285/api/Produkti/Products`, authentikimi
        );
        setProduktet(produktet.data);

      } catch (err) {
        console.log(err);
      }
    };

    vendosProduktet();
  }, [perditeso]);*/

 /* useEffect(() => {
    const getStudentsD = async () => {
        try {
            const students = await axios.get(
                "https://localhost:7214/api/Student"
            );
            setStudents(students.data);
        }
        catch (err) {
            console.log(err);
        }
    };
  
    getStudentsD();
  }, [refreshD]);

  const handleNameChange = (value) => {
    setName(value);
  };
  const handleSurnameChange = (value) => {
    setSurname(value);
  };
  const handleBirthDateChange = (value) => {
    setBirthDate(value);
  };
  const handleGenderChange = (value) => {
    setGender(value);
  };
  const handleCityChange = (value) => {
    setCity(value);
  };
  const handleEmailChange = (value) => {
    setEmail(value);
  };
  const handlePhotoChange = (value) => {
    setPhoto(value);
  };
  const handleDepartmentChange = (value) => {
    setDepartmentName(value);
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


  async function handleSubmit() {
    /*if (foto) {
      const formData = new FormData();
      formData.append('foto', foto);*/

    /*try {
      await axios
        .post("https://localhost:7214/api/Student", {
            name: name,
            surname: surname,
            birthDate: birthDate ? new Date(birthDate).toISOString() : null,
            gender: gender,
            city: city,
            email: email,
            photo: photo,
            departmentId: departmentId
            }, 
            {
              headers: {
                "Content-Type": "application/json"
              }
        })
        .then(async (response) => {
          toast.success('Student has been added !');
          //setRefreshD(Date.now());
          props.perditesoTeDhenat();
          props.hide();
        })
        .catch((error) => {
          console.log(error);
          toast.error('Failed to add student');
        });
} catch (error) {
    console.error(error);
    toast.error('Failed to add student');
}}

  function isNullOrEmpty(value) {
    return value === null || value === "" || value === undefined;
  }

  const handleControl = () => {
    if (
      isNullOrEmpty(departmentName)
    ) {
      setFushatEZbrazura(true);
    } else {
      if (confirmStudent == false && students.filter((item) => item.name === name).length !== 0) {
        setControlStudent(true);
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
      {controlStudent &&
        <Modal size="sm" show={controlStudent} onHide={() => setControlStudent(false)}>
          <Modal.Header closeButton>
            <Modal.Title as="h6">Confirm input</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span style={{ fontSize: "10pt" }}>
              A student with the same name happens to be on the system!
            </span>
            <br />
            <strong style={{ fontSize: "10pt" }}>
              Are you sure you want to continue?
            </strong>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={() => setKontrolloProduktin(false)}>
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
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Student Name<span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control
                onChange={(e) => handleNameChange(e.target.value)}
                value={name}
                type="text"
                placeholder="Name..."
                autoFocus
              />
            </Form.Group>
            <Form.Group controlId = "ProfessorSurname">
                <Form.Label>Student Surname</Form.Label>
                <Form.Control type="text" name="ProfessorSurname" required placeholder="Surname..."
                value={surname} onChange={(e) => handleSurnameChange(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <br/>
                                <Form.Group controlId = "ProfessorBirthdate">
                                    <Form.Label>Student Date of Birth</Form.Label>
                                    <Form.Control type="date" name="StudentBirthdate" required placeholder="Birthdate..."
                                    value={birthDate} onChange={(e) => handleBirthDateChange(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <br/>
                                <Form.Group controlId="ProfessorGender">
                                  <Form.Label>Student Gender</Form.Label>
                                  <Form.Select 
                                        value={gender}
                                        onChange={(e) => handleGenderChange(e.target.value)} 
                                        required
                                    >
                                        <option value="" hidden disabled>Select Gender</option>
                                        <option value="Female">Female</option>
                                        <option value="Male">Male</option>
                                        
                                    </Form.Select>
                                </Form.Group>
                                <br/>
                                <Form.Group controlId = "ProfessorCity">
                                    <Form.Label>Student City</Form.Label>
                                    <Form.Control type="text" name="ProfessorCity" required placeholder="City..."
                                    value={city} onChange={(e) => handleCityChange(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <br/>
                                <Form.Group controlId = "ProfessorEmail">
                                    <Form.Label>Student Email</Form.Label>
                                    <Form.Control type="text" name="ProfessorEmail" required placeholder="Email..."
                                    value={email} onChange={(e) => handleEmailChange(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <br/>
                                <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                              >
                                <Form.Label>Department<span style={{ color: "red" }}>*</span></Form.Label>
                                <select
                                  placeholder="Department..."
                                  className="form-select"
                                  value={departmentName}
                                  onChange={(e) => handleDepartmentChange(e.target.value)}
                                >
                                  <option defaultValue disabled value="">
                                    Department
                                  </option>
                                  {departments.map((item) => {
                                    return (
                                      <option key={item.departmentId} value={item.departmentId}>{item.departmentName}</option>
                                    );
                                  })}
                                </select>
                              </Form.Group>
                              <br/>
                                <Form.Group>
                                    <Button variant = "info" type="submit" onClick={handleControl}>
                                        Add New Student
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

export default AddStudent;*/
