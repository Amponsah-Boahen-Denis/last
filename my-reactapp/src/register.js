import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests

const Register = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate between routes
  const [formData, setFormData] = useState({
    username: '', // State to store user username
    email: '', // State to store user email
    password: '', // State to store user password
  });
  const { username, email, password } = formData;

  const handleChange = (e) => {
    // Update form data as user types
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      // Perform a POST request to the registration endpoint
      const response = await axios.post('https://lastback.vercel.app/register', formData, {
        headers: {
          'Content-Type': 'application/json', // Set the content type of the request
          'Accept': 'application/json', // Ensure that the response is in JSON format
        },
        withCredentials: true, // Allow cookies to be sent with the request
      });

      if (response.status === 200) {
        alert('Registration successful! Redirecting to login...'); // Notify user of successful registration
        navigate('/login'); // Redirect to login after successful registration
      } else {
        alert(response.data.message || 'Registration failed'); // Notify if registration failed with specific message
      }
    } catch (error) {
      console.error('Error:', error); // Log any errors that occur during registration
      alert('An unexpected error occurred. Please try again later.'); // Notify user of error
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="Username" // Placeholder text for username input
          required // Username field is required
          style={styles.input}
        />
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
        <button type="submit" style={styles.button}>Register</button> {/* Submit button for registration */}
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

export default Register;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; // Import axios

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });
//   const { username, email, password } = formData;

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('https://lastback.vercel.app/register', formData, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.status === 200) {
//         alert('Registration successful! Redirecting to login...');
//         navigate('/login'); // Redirect to login after successful registration
//       } else {
//         alert(response.data.message || 'Registration failed');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An unexpected error occurred. Please try again later.');
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.header}>Register</h2>
//       <form onSubmit={handleSubmit} style={styles.form}>
//         <input
//           type="text"
//           name="username"
//           value={username}
//           onChange={handleChange}
//           placeholder="Username"
//           required
//           style={styles.input}
//         />
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
//         <button type="submit" style={styles.button}>Register</button>
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

// export default Register;
