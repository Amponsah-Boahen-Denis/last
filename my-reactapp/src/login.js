
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  
  // Instead of formData as a single object, use individual state variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Simplified change handlers for each field
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Submit handler stays asynchronous, but logic is refactored
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Gather form data using individual state variables
    const userCredentials = { email, password };

    try {
      const response = await axios({
        method: 'POST',
        url: 'https://lastback.vercel.app/login',
        headers: { 'Content-Type': 'application/json' },
        data: userCredentials,
      });

      if (response.status === 200) {
        // Storing token with added attributes for security
        document.cookie = `token=${response.data.token}; path=/; secure; SameSite=Strict`;
        alert('Login successful!');
        navigate('/');  // Redirect after successful login
      } else {
        // If there's an error, alert user
        alert(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  // Handle registration redirect in a more concise manner
  const handleRegisterRedirect = (e) => {
    e.preventDefault();
    navigate('/register'); // Navigate to the register page
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
    marginBottom: '10px',
  },
};

export default Login;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const { email, password } = formData;

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('https://lastback.vercel.app/login', formData, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       const data = response.data;
//       if (response.status === 200) {
//         // Store the token in a cookie for better security
//         document.cookie = `token=${data.token}; path=/; secure; SameSite=Strict`; // Secure and SameSite attributes added
//         alert('Login successful!');
//         navigate('/'); // Redirect to dashboard after successful login
//       } else {
//         alert(data.message || 'Login failed');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An unexpected error occurred. Please try again later.');
//     }
//   };

//   const handleRegisterRedirect = (event) => {
//     event.preventDefault();
//     navigate('/register'); // Navigate to the register page
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
//     marginBottom: '10px',
//   },
// };

// export default Login;
