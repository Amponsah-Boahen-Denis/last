
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://lastback.vercel.app/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Ensure cookies are included in the request
      });

      if (response.status === 200) {
        // No need to manually store the token; the backend should handle cookies
        alert('Login successful!');
        navigate('/'); // Redirect on successful login
      } else {
        alert(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  const handleRegisterRedirect = (e) => {
    e.preventDefault();
    navigate('/register'); // Redirect to register page
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
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
    backgroundColor: '#eafaf1', // Light greenish background
  },
  header: {
    color: '#2d6a4f', // Darker green text
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
    border: '1px solid #6ba583', // Greenish border
  },
  button: {
    padding: '10px',
    backgroundColor: '#2d6a4f', // Green button
    color: '#ffffff', // White text
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '10px',
  },
};

export default Login;
