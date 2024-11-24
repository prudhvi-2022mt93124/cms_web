// src/components/AddUser.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddUser = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !email ) {
            alert('Please fill out all fields');
            return;
        }

        try {
            // Add new user via API (replace with actual endpoint)
            await axios.post('http://127.0.0.1:8181/users', { firstName, lastName, email, password: "test" });
            navigate("/dashboard");
            // history.push('/');  // Redirect to dashboard after adding
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <div>
            <h2>Add New User</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button type="submit" variant="primary">Add User</Button>
            </Form>
        </div>
    );
};

export default AddUser;
