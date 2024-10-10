
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests

const Login = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate between routes
  const [formData, setFormData] = useState({
    email: '', // State to store user email
    password: '', // State to store user password
  });
  const { email, password } = formData;

  const handleChange = (e) => {
    // Update form data as user types
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      // Perform a POST request to the login endpoint
      const response = await axios.post('https://lastback.vercel.app/login', formData, {
        headers: {
          'Content-Type': 'application/json', // Set the content type of the request
          'Accept': 'application/json', // Ensure that the response is in JSON format
        },
        withCredentials: true, // Allow cookies to be sent with the request
        timeout: 10000, // Set a timeout of 10 seconds
      });

      if (response.status === 200) {
        alert('Login successful!'); // Notify the user of successful login
        navigate('/'); // Redirect to the home page on successful login
      } else {
        alert(response.data.message || 'Login failed'); // Notify if login failed with specific message
      }
    } catch (error) {
      console.error('Login Error:', error); // Log any errors that occur during login
      if (error.response) {
        // The request was made, but the server responded with a status code outside of the 2xx range
        console.error('Response data:', error.response.data);
        alert(error.response.data.message || 'An error occurred. Please try again later.');
      } else if (error.request) {
        // The request was made, but no response was received
        console.error('Request data:', error.request);
        alert('No response from the server. Please check your internet connection and try again.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        alert('An unexpected error occurred. Please try again later.');
      }
    }
  };

  const handleRegisterRedirect = (e) => {
    e.preventDefault(); // Prevent default action of button
    navigate('/register'); // Redirect to the registration page
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
          placeholder="Email" // Placeholder text for email input
          required // Email field is required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password" // Placeholder text for password input
          required // Password field is required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button> {/* Submit button for login */}
        <button onClick={handleRegisterRedirect} style={styles.button}>Register</button> {/* Button to navigate to registration */}
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



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; // Import axios for making HTTP requests

// const Login = () => {
//   const navigate = useNavigate(); // Hook to programmatically navigate between routes
//   const [formData, setFormData] = useState({
//     email: '', // State to store user email
//     password: '', // State to store user password
//   });
//   const { email, password } = formData;

//   const handleChange = (e) => {
//     // Update form data as user types
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent the default form submission
//     try {
//       // Perform a POST request to the login endpoint
//       const response = await axios.post('https://lastback.vercel.app/login', formData, {
//         headers: {
//           'Content-Type': 'application/json', // Set the content type of the request
//           'Accept': 'application/json', // Ensure that the response is in JSON format
//         },
//         withCredentials: true, // Allow cookies to be sent with the request
//       });

//       if (response.status === 200) {
//         alert('Login successful!'); // Notify the user of successful login
//         navigate('/'); // Redirect to the home page on successful login
//       } else {
//         alert(response.data.message || 'Login failed'); // Notify if login failed with specific message
//       }
//     } catch (error) {
//       console.error('Login Error:', error); // Log any errors that occur during login
//       alert('An unexpected error occurred. Please try again later.'); // Notify user of error
//     }
//   };

//   const handleRegisterRedirect = (e) => {
//     e.preventDefault(); // Prevent default action of button
//     navigate('/register'); // Redirect to the registration page
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
//           placeholder="Email" // Placeholder text for email input
//           required // Email field is required
//           style={styles.input}
//         />
//         <input
//           type="password"
//           name="password"
//           value={password}
//           onChange={handleChange}
//           placeholder="Password" // Placeholder text for password input
//           required // Password field is required
//           style={styles.input}
//         />
//         <button type="submit" style={styles.button}>Login</button> {/* Submit button for login */}
//         <button onClick={handleRegisterRedirect} style={styles.button}>Register</button> {/* Button to navigate to registration */}
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


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; // Import axios

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
//         withCredentials: true, // Ensure cookies are included in the request
//       });

//       if (response.status === 200) {
//         // No need to manually store the token; the backend should handle cookies
//         alert('Login successful!');
//         navigate('/'); // Redirect on successful login
//       } else {
//         alert(response.data.message || 'Login failed');
//       }
//     } catch (error) {
//       console.error('Login Error:', error);
//       alert('An unexpected error occurred. Please try again later.');
//     }
//   };

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
