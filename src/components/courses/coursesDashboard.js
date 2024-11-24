// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Row, Col, Card, Container } from 'react-bootstrap';

const Course = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Fetch courses from the API
        axios.get('http://127.0.0.1:8181/courses')  // Mock API, replace with your backend API
            .then((response) => {
                setCourses(response.data.response);
            })
            .catch((error) => {
                console.error('Error fetching courses', error);
            });
    }, []);

    const handleDelete = (id) => {
        // Make DELETE request to API
        axios.delete(`http://127.0.0.1:8181/courses/${id}`)
            .then(() => {
                setCourses(courses.filter((course) => course.id !== id));
            })
            .catch((error) => {
                console.error('Error deleting course', error);
            });
    };


    return (
        <Container>

            <div className="mb-4">
                <Link to="/dashboard">
                    <Button variant="primary">User Dashboard</Button>
                </Link>
            </div>

            <div className="mb-4">
                <Link to="/addcourse">
                    <Button variant="primary">Add New Course</Button>
                </Link>
            </div>

            <Row>
                {courses.map(course => (
                    <Col sm={12} md={6} lg={4} key={course.id} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{course.courseId}</Card.Title>
                                <Card.Text>
                                    <strong>course Name: </strong>{course.courseName}
                                </Card.Text>
                                <Card.Text>
                                    <strong>course Description: </strong>{course.courseDescription}
                                </Card.Text>
                                <Card.Text>
                                    <strong>course Author: </strong>{course.courseAuthor}
                                </Card.Text>
                                <Link to={`/edit/${course.id}`}>
                                    <Button variant="warning" className="mr-2">Edit</Button>
                                </Link>
                                <Button variant="danger" onClick={() => handleDelete(course.id)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Course;
