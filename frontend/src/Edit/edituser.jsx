import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../Create/createuser.css';

function EditUser({ users, updateUser }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = users ? users.find((u) => u.id === parseInt(id)) : null;

  const [username, setUsername] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [role, setRole] = useState(user ? user.role : 'user');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      updateUser({
        id: user.id,
        name: username,
        email: email,
        role: role
      });
      navigate('/');
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