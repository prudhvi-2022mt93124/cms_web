// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Row, Col, Card, Container } from 'react-bootstrap';

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the API
    axios.get('http://127.0.0.1:8181/users')  // Mock API, replace with your backend API
      .then((response) => {
        setUsers(response.data.response);
      })
      .catch((error) => {
        console.error('Error fetching users', error);
      });
  }, []);

  const handleDelete = (id) => {
    // Make DELETE request to API
    axios.delete(`http://127.0.0.1:8181/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting user', error);
      });
  };


  return (
    <Container>
      <div className="mb-4">
        <Link to="/add">
          <Button variant="primary">Add New User</Button>
        </Link>
      </div>

      <Row>
        {users.map(user => (
          <Col sm={12} md={6} lg={4} key={user.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{user.firstName}</Card.Title>
                <Card.Text>
                  <strong>Email: </strong>{user.email}
                </Card.Text>
                <Card.Text>
                  <strong>first name: </strong>{user.firstName}
                </Card.Text>
                <Card.Text>
                  <strong>last name: </strong>{user.lastName}
                </Card.Text>
                <Link to={`/edit/${user.id}`}>
                  <Button variant="warning" className="mr-2">Edit</Button>
                </Link>
                <Button variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Dashboard;
