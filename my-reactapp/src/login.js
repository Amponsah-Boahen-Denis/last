import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Email change handler
  const handleEmailChange = (e) => setEmail(e.target.value);
  
  // Password change handler
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userCredentials = { email, password };  // Gather form data
    
    try {
      const response = await axios.post('https://lastback.vercel.app/login', userCredentials);
      
      if (response.status === 200) {
        // Store the token securely in a cookie
        document.cookie = `token=${response.data.token}; path=/; secure; SameSite=Strict`;
        alert('Login successful!');
        navigate('/');  // Redirect on success
      } else {
        alert(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  // Redirect to register page
  const handleRegisterRedirect = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          required
          style={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
        <button onClick={handleRegisterRedirect} style={styles.button}>Register</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#eafaf1',  // Light greenish background
  },
  header: {
    color: '#2d6a4f',  // Darker green text
    fontSize: '24px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #6ba583',  // Greenish border
  },
  button: {
    padding: '10px',
    backgroundColor: '#2d6a4f',  // Green button
    color: '#ffffff',  // White text
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginBottom: '10px',
  },
};

export default Login;
