import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditCourse = ({ show, handleClose, refreshData, course }) => {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [credits, setCredits] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        if (course) {
            setName(course.courseName);
            setCode(course.code);
            setCredits(course.credits);
            setCategory(course.category);
        }
    }, [course]);

    const handleEdit = async () => {
        try {
            await axios.put(`https://localhost:7028/api/Course/${course.courseId}`, {
                courseId: course.courseId,
                courseName: name,
                code,
                credits,
                category
            });
            toast.success('Course updated successfully!');
            handleClose();
            refreshData();
        } catch (error) {
            toast.error('Failed to update the course.');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Code</Form.Label>
                        <Form.Control type="text" value={code} onChange={(e) => setCode(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>ECTS</Form.Label>
                        <Form.Control type="number" value={credits} onChange={(e) => setCredits(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="primary" onClick={handleEdit}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditCourse;
