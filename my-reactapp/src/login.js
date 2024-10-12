
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
  e.preventDefault(); // Prevent default form submission

  try {
    const response = await axios.post('https://lastback.vercel.app/login', formData, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true, // Ensure cookies are included in the request if the backend uses cookies for sessions
    });

    // Check if the response contains a token
    if (response && response.data && response.data.token) {
      // Store the token in localStorage
      localStorage.setItem('token', response.data.token);
      console.log('Token:', response.data.token);
      alert('Login successful!'); // Notify user of success
      return navigate('/edit'); // Redirect to the edit page on successful login
    } else {
      alert('Login failed. No token received. Please check your credentials or try again.'); // Error if no token is found
    }
  } catch (error) {
    console.error('Login Error:', error);
    alert('Login failed. Please check your credentials or try again later.'); // Generic error message
  }
};

  
// const handleSubmit = async (e) => {
//   e.preventDefault(); // Prevent default form submission

//   try {
//     const response = await axios.post('https://lastback.vercel.app/login', formData, {
//       headers: { 'Content-Type': 'application/json' },
//       withCredentials: true, // Ensure cookies are included in the request if the backend uses cookies for sessions
//     });

//     // Check if the response contains a token or success message
//     if (response) {
//       // Store the token in localStorage
//       localStorage.setItem('token', response.data.token);
//       console.log(response.data.token)
//       alert('Login successful!'); // Notify user of success
//     return  navigate('/edit'); // Redirect to the edit page on successful login
//     } else {
//       alert('Login failed. Please check your credentials or register.'); // Generic error message
//     }
//   } catch (error) {
//     console.error('Login Error:', error);
//     alert('Login failed. Please check your credentials or try again later.'); // Generic error message
//   }
// };


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
