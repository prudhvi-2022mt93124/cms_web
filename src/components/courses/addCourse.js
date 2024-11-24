// src/components/AddUser.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddCourse = () => {
    const [courseName, setCourseName] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [courseAuthor, setCourseAuthor] = useState('');
    const [courseId, setCourseId] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!courseAuthor || !courseDescription || !courseId || !courseName ) {
            alert('Please fill out all fields');
            return;
        }

        try {
            // Add new user via API (replace with actual endpoint)
            await axios.post('http://127.0.0.1:8181/courses', { courseAuthor, courseDescription, courseId, courseName });
            navigate("/courses");
            // history.push('/');  // Redirect to dashboard after adding
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <div>
            <h2>Add New Course</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>course Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Course Author</Form.Label>
                    <Form.Control
                        type="text"
                        value={courseAuthor}
                        onChange={(e) => setCourseAuthor(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>course description</Form.Label>
                    <Form.Control
                        type="text"
                        value={courseDescription}
                        onChange={(e) => setCourseDescription(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>course Id</Form.Label>
                    <Form.Control
                        type="text"
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button type="submit" variant="primary">Add Course</Button>
            </Form>
        </div>
    );
};

export default AddCourse;
