import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getUserById, updateUser } from '../api';
import '../Create/createuser.css';

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');

  useEffect(() => {
    getUserById(id)
      .then(response => {
        const userData = response.data;
        setUser(userData);
        setUsername(userData.username);
        setEmail(userData.email);
        setRole(userData.role);
      })
      .catch(error => console.error("Error fetching user by ID:", error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      const updatedUser = {
        username: username,
        email: email,
        role: role,
      };
      updateUser(user.userId, updatedUser)
        .then(() => {
          navigate('/');
        })
        .catch(error => console.error("Error updating user:", error));
    }
  };

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="create-user-container">
      <h1>Edit User</h1>
      <p>Update the form to edit the user</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button type="submit">Update User</button>
      </form>
      <Link to="/" className="back-button">
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </Link>
    </div>
  );
}

export default EditUser;