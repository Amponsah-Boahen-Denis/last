import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './password.css';

function AddPassword() {
  const [description, setDescription] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');


  const isTokenExpired = (token) => {
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.exp * 1000 < Date.now();
};

  const handleSubmit = async (event) => {
  event.preventDefault();

  // Validate form inputs before submission
  if (!description || !username || !password || !url) {
    setMessage('Please fill in all required fields.');
    return;
  }

  // Create a new account object
  const newAccount = {
    Description: description,
    Username: username,
    Password: password,
    URL: url,
    Notes: notes
  };

  // Get the token from localStorage
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found! Please login.');
    setMessage('No token found! Please login.');
    return;
  }

  // Check if the token is expired
  const isExpired = isTokenExpired(token); // Ensure you have this utility function
  if (isExpired) {
    console.error('Token is expired. Please login again.');
    setMessage('Token expired! Please login again.');
    return;
  }

  try {
    // Send POST request to the server to add a new password entry with Authorization header
    const response = await axios.post('https://lastback.vercel.app/account', newAccount, {
      headers: {
        Authorization: `Bearer ${token}` // Include JWT token in the request
      }
    });

    // On successful addition of the account
    setMessage('Password added successfully!');

    // Clear form fields after successful submission
    setDescription('');
    setUsername('');
    setPassword('');
    setUrl('');
    setNotes('');

  } catch (error) {
    // Enhanced error handling
    if (error.response) {
      // Server responded with a status other than 200
      console.error('Error response:', error.response.data);
      setMessage(`Failed to add password: ${error.response.data.message || 'Unknown error.'}`);
    } else if (error.request) {
      // Request was made but no response received
      console.error('Error request:', error.request);
      setMessage('No response from the server. Please try again later.');
    } else {
      // Something else happened while setting up the request
      console.error('Error message:', error.message);
      setMessage('An unexpected error occurred. Please try again.');
    }
  }
};


  // const handleSubmit = (event) => {
  //   event.preventDefault();
    
  //   // Create a new account object
  //   const newAccount = {
  //     Description: description,
  //     Username: username,
  //     Password: password,
  //     URL: url,
  //     Notes: notes
  //   };

  //   // Get the token from localStorage
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     console.error('No token found! Please login.');
  //     setMessage('No token found! Please login.');
  //     return;
  //   }

  //   // Send POST request to the server to add a new password entry with Authorization header
  //   axios.post('https://lastback.vercel.app/account', newAccount, {
  //     headers: {
  //       Authorization: `Bearer ${token}` // Include JWT token in the request
  //     }
  //   })
  //     .then(response => {
  //       setMessage('Password added successfully!');
  //       // Clear form fields after successful submission
  //       setDescription('');
  //       setUsername('');
  //       setPassword('');
  //       setUrl('');
  //       setNotes('');
  //     })
  //     .catch(error => {
  //       console.error('There was an error adding the password!', error);
  //       setMessage('Failed to add password. Please try again.');
  //     });
  // };

  return (
    <div>
      <div className="div2">
        <h1 className="h1">ADD NEW ACCOUNT</h1>
        <div className="div">
          <button className="button1">
            <Link to={'/'} className="link">Go Back</Link>
          </button>
          <form onSubmit={handleSubmit} className="flex2">
            <div className="flex1">
              <label className="button2">Account name</label>
              <input 
                className="b" 
                type="text" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                required 
              />
            </div>
            <div className="flex1">
              <label className="button2">Username</label>
              <input 
                className="b" 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
              />
            </div>
            <div className="flex1">
              <label className="button2">Password</label>
              <input 
                className="b" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <div className="flex1">
              <label className="button2">Url</label>
              <input 
                className="b" 
                type="url" 
                value={url} 
                onChange={(e) => setUrl(e.target.value)} 
              />
            </div>
            <div className="flex1">
              <label className="button2">Notes</label>
              <input 
                className="b" 
                type="text" 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)} 
              />
            </div>
            <button type="submit" className="button1">Add Information</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default AddPassword;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import './password.css';

// function AddPassword() {
//   const [description, setDescription] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [url, setUrl] = useState('');
//   const [notes, setNotes] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
    
//     // Create a new account object
//     const newAccount = {
//       Description: description,
//       Username: username,
//       Password: password,
//       URL: url,
//       Notes: notes
//     };

//     // Send POST request to the server to add a new password entry
//     axios.post('https://lastback.vercel.app/account', newAccount)
//       .then(response => {
//         setMessage('Password added successfully!');
//         // Clear form fields after successful submission
//         setDescription('');
//         setUsername('');
//         setPassword('');
//         setUrl('');
//         setNotes('');
//       })
//       .catch(error => {
//         console.error('There was an error adding the password!', error);
//         setMessage('Failed to add password. Please try again.');
//       });
//   };

//   return (
//     <div>
//       <div className="div2">
//         <h1 className="h1">ADD NEW ACCOUNT</h1>
//         <div className="div">
//           <button className="button1">
//             <Link to={'/'} className="link">Go Back</Link>
//           </button>
//           <form onSubmit={handleSubmit} className="flex2">
//             <div className="flex1">
//               <label className="button2">Account name</label>
//               <input 
//                 className="b" 
//                 type="text" 
//                 value={description} 
//                 onChange={(e) => setDescription(e.target.value)} 
//                 required 
//               />
//             </div>
//             <div className="flex1">
//               <label className="button2">Username</label>
//               <input 
//                 className="b" 
//                 type="text" 
//                 value={username} 
//                 onChange={(e) => setUsername(e.target.value)} 
//                 required 
//               />
//             </div>
//             <div className="flex1">
//               <label className="button2">Password</label>
//               <input 
//                 className="b" 
//                 type="password" 
//                 value={password} 
//                 onChange={(e) => setPassword(e.target.value)} 
//                 required 
//               />
//             </div>
//             <div className="flex1">
//               <label className="button2">Url</label>
//               <input 
//                 className="b" 
//                 type="url" 
//                 value={url} 
//                 onChange={(e) => setUrl(e.target.value)} 
//               />
//             </div>
//             <div className="flex1">
//               <label className="button2">Notes</label>
//               <input 
//                 className="b" 
//                 type="text" 
//                 value={notes} 
//                 onChange={(e) => setNotes(e.target.value)} 
//               />
//             </div>
//             <button type="submit" className="button1">Add Information</button>
//           </form>
//           {message && <p>{message}</p>}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddPassword;
