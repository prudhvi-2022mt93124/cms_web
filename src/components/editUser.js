import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditUserPage = () => {
  const { id } = useParams(); // Get user ID from the URL
  const navigate = useNavigate();

  const [user, setUser] = useState({ name: '', email: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch user details by ID from API
        const response = await axios.get(`http://127.0.0.1:8181/users/${id}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching user data');
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the updated user data to the backend API
    try {
      await axios.put(`http://127.0.0.1:8181/users/${id}`, user);
      navigate('/users'); // Redirect to users list after successful update
    } catch (error) {
      setError('Error updating user');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="edit-user-page">
      <h2>Edit User</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUserPage;
