// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Row, Col, Card, Container } from 'react-bootstrap';

const CourseList = () => {
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


    return (
        <Container>

            <Row>
                {courses.map(course => (
                    <Col sm={12} md={6} lg={4} key={course.id} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title><b>{course.courseId}</b></Card.Title>
                                <Card.Text>
                                    <strong>course Name: </strong>{course.courseName}
                                </Card.Text>
                                <Card.Text>
                                    <strong>course Description: </strong>{course.courseDescription}
                                </Card.Text>
                                <Card.Text>
                                    <strong>course Author: </strong>{course.courseAuthor}
                                </Card.Text>
                                {/* <Link to={`/edit/${course.id}`}>
                                    <Button variant="warning" className="mr-2">Edit</Button>
                                </Link> */}
                                <Button variant="danger">Enroll course</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CourseList;
