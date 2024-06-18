import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './signin.css';
import { loginUser } from '../api';

function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      console.error('Username and password are required');
      return;
    }
    const user = { username, password };
    try {
      const response = await loginUser(user);
      const token = response.data.token;
      const role = response.data.role;
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('userRole', role);
      console.log('Login successful, token stored and role stored');
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
      // Check if the error response has a custom error message
      const errorMessage = error.response?.data?.message || 'Invalid username or password';
      setErrorMessage(errorMessage); // Set the error message
    }
  };

  return (
    <div className="signin-container">
      <h1>Sign In</h1>
      <p>Enter your username and password to access your account</p>
      {errorMessage && <a className="error-message">{errorMessage}</a>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <Link to="/signup" className="signup-link">Don't have an account? Sign up</Link>
      <Link to="/" className="back-button">Back</Link>
    </div>
  );
}

export default SignIn;