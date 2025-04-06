

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const { username, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('https://lastback.vercel.app/register', formData, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (response) {
  //       alert('Registration successful! Redirecting to login...');
  //     return  navigate('/'); // Redirect to login after successful registration
  //     } else {
  //       alert(response.data.message || 'Registration failed or account already exist!');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     alert('Registration failed or account already exist!');
  //   }
  // };



const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent default form submission

  try {
    const response = await axios.post('https://lastback.vercel.app/register', formData, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (response) {
      // Store the token in localStorage
      localStorage.setItem('token', response.data.token);
      alert('Registration successful! Redirecting to login...');
      return navigate('/'); // Redirect to login after successful registration
    } else {
      alert(response.data.message || 'Registration failed or account already exists!');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Registration failed or account already exists!');
  }
};

  
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Sign Up Here</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="Username"
          required
          style={styles.input}
        />
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
        <button type="submit" style={styles.button}>Sign up</button>
      </form>
    </div>
  );
};

// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100vh',
//     backgroundColor: '#eafaf1', // Light greenish background
//   },
//   header: {
//     color: '#2d6a4f', // Darker green text
//     fontSize: '24px',
//     marginBottom: '20px',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     width: '300px',
//   },
//   input: {
//     padding: '10px',
//     margin: '10px 0',
//     borderRadius: '5px',
//     border: '1px solid #6ba583', // Greenish border
//   },
//   button: {
//     padding: '10px',
//     backgroundColor: '#2d6a4f', // Green button
//     color: '#ffffff', // White text
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s',
//     marginTop: '10px',
//   },
// };
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0faf5', // Lighter green background
  },
  header: {
    color: '#1a3a27', // Dark green
    fontSize: '24px',
    marginBottom: '20px',
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '320px',
    gap: '15px', // Replaces margin in inputs
  },
  input: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #c8e6c9', // Soft green border
    fontSize: '16px',
    outline: 'none',
    transition: 'border 0.3s',
  },
  button: {
    padding: '12px',
    backgroundColor: '#2e7d32', // Rich green
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '5px',
  },
};

export default Register;
