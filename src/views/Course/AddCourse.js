import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

const AddCourse = ({ show, handleClose, refreshData }) => {
  const [courseName, setCourseName] = useState("");
  const [code, setCode] = useState("");
  const [credits, setCredits] = useState("");
  const [category, setCategory] = useState("");

  const handleAddCourse = async () => {
    if (!courseName || !code || !credits || !category) {
      toast.error("Please fill in all fields!");
      return;
    }

    const newCourse = { courseName, code, credits, category };

    try {
      await axios.post("https://localhost:7028/api/Course", newCourse);
      toast.success("Course added successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
      handleClose();
      refreshData();
    } catch (error) {
      toast.error("Failed to add course.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Course</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Course Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name..."
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Code..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>ECTS</Form.Label>
            <Form.Control
              type="number"
              placeholder="ECTS..."
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Category..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAddCourse}>
          Add Course
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCourse;
