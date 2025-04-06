
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


//   const handleRegisterRedirect = (e) => {
//     e.preventDefault();
//     navigate('/register'); // Redirect to register page
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.header}>Login</h2>
//       <form onSubmit={handleSubmit} style={styles.form}>
//         <input
//           type="email"
//           name="email"
//           value={email}
//           onChange={handleChange}
//           placeholder="Email"
//           required
//           style={styles.input}
//         />
//         <input
//           type="password"
//           name="password"
//           value={password}
//           onChange={handleChange}
//           placeholder="Password"
//           required
//           style={styles.input}
//         />
//         <button type="submit" style={styles.button}>Login</button>
//         <button onClick={handleRegisterRedirect} style={styles.button}>Register</button>
//       </form>
//     </div>
//   );
// };

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

// export default Login;

   const handleRegisterRedirect = (e) => {
    e.preventDefault();
    navigate('/register'); // Redirect to register page
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.welcomeHeader}>Welcome to Password Manager</h1>
      <div style={styles.loginCard}>
        <h2 style={styles.loginHeader}>Login</h2>
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
          <button type="submit" style={styles.loginButton}>Login</button>
          <button onClick={handleRegisterRedirect} style={styles.registerButton}>Register</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0faf5', // Very light green background
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  welcomeHeader: {
    color: '#1a3a27', // Dark green
    fontSize: '28px',
    marginBottom: '30px',
    textAlign: 'center',
    fontWeight: '600',
  },
  loginCard: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '30px',
    boxShadow: '0 4px 12px rgba(0, 100, 0, 0.1)', // Subtle green shadow
    width: '350px',
    maxWidth: '90%',
  },
  loginHeader: {
    color: '#1a3a27', // Dark green
    fontSize: '22px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #c8e6c9', // Light green border
    fontSize: '16px',
    outline: 'none',
    transition: 'border 0.3s',
  },
  inputFocus: {
    border: '1px solid #4caf50', // Brighter green on focus
  },
  loginButton: {
    padding: '12px',
    backgroundColor: '#2e7d32', // Dark green
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  registerButton: {
    padding: '12px',
    backgroundColor: '#4caf50', // Medium green
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default Login;
