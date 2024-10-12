
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './css/edit.css';

function EditRecord() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(id);
  const [formData, setFormData] = useState({
    Username: '',
    Password: '',
    Notes: '',
    URL: ''
  });



  const isTokenExpired = (token) => {
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.exp * 1000 < Date.now();
};

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const token = localStorage.getItem('token');
  //       if (!token) {
  //         console.error('No token found! Please login.');
  //         return;
  //       }

  //       const response = await axios.get('https://lastback.vercel.app/account', {
  //         headers: {
  //           Authorization: `Bearer ${token}` 
  //         }
  //       });

  //       setAccounts(response.data);

  //       const account = response.data.find(acc => acc._id === selectedAccountId);
  //       if (account) {
  //         setFormData({
  //           Username: account.Username,
  //           Password: account.Password,
  //           Notes: account.Notes,
  //           URL: account.URL
  //         });
  //       }
  //     } catch (error) {
  //       console.error('There was an error fetching the data!', error);
  //     }
  //   };

  //   fetchData();
  // }, [selectedAccountId]);



useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found! Please login.');
        return;
      }

      const isExpired = isTokenExpired(token); // Call the expiration check function
      if (isExpired) {
        console.error('Token is expired. Please login again.');
        return;
      }

      const response = await axios.get('https://lastback.vercel.app/account', {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });

      setAccounts(response.data);

      const account = response.data.find(acc => acc._id === selectedAccountId);
      if (account) {
        setFormData({
          Username: account.Username,
          Password: account.Password,
          Notes: account.Notes,
          URL: account.URL
        });
      }
    } catch (error) {
      console.error('There was an error fetching the data!', error.response ? error.response.data : error);
    }
  };

  fetchData();
}, [selectedAccountId]);




  
  
  const handleAccountChange = (event) => {
    setSelectedAccountId(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     console.error('No token found! Please login.');
  //     return;
  //   }

  //   axios.put(`https://lastback.vercel.app/account/${selectedAccountId}`, formData, {
  //     headers: {
  //       Authorization: `Bearer ${token}` 
  //     }
  //   })
  //     .then(response => {
  //       console.log('Data updated successfully!');
  //     })
  //     .catch(error => {
  //       console.error('There was an error updating the data!', error);
  //     });
  // };


const handleSubmit = (event) => {
  event.preventDefault();

  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found! Please login.');
    setMessage('No token found! Please login.');
    return;
  }

   const [message, setMessage] = useState('');
  // Check if the token is expired
  if (isTokenExpired(token)) {
    console.error('Token expired! Please login again.');
    setMessage('Token expired! Please login again.');
    return;
  }

  // Proceed with updating account data
  axios.put(`https://lastback.vercel.app/account/${selectedAccountId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      console.log('Data updated successfully!');
      setMessage('Account updated successfully.');
    })
    .catch(error => {
      console.error('There was an error updating the data!', error);
      setMessage('Failed to update account. Please try again.');
    });
};



  
  const handleSubmit2 = (event) => {
    event.preventDefault();
    navigate('/password');
  };

  return (
    <div className='container'>
      <h1 className='h2'>PASSWORD MANAGER</h1>
      <p>This app helps you securely manage and track your social media account credentials.</p>
      <button onClick={handleSubmit2} className='butt'>Add Account</button>
      <div>
        <select className='sel' value={selectedAccountId} onChange={handleAccountChange}>
          <option value="">Select already existed account</option>
          {accounts.map(account => (
            <option key={account._id} value={account._id}>{account.Description}</option>
          ))}
        </select>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='label'>Username:</label>
          <input className='input'
            type="text"
            name="Username"
            value={formData.Username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className='label'>Password:</label>
          <input className='input'
            type="text"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className='label'>URL:</label>
          <input className='input'
            type="text"
            name="URL"
            value={formData.URL}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className='label'>Notes:</label>
          <input className='input'
            type="text"
            name="Notes"
            value={formData.Notes}
            onChange={handleChange}
          />
        </div>
       
        <button type="submit" className='butt'>Edit Above & Update</button>
      </form>
    </div>
  );
}

export default EditRecord;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import './css/edit.css';

// function EditRecord() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [accounts, setAccounts] = useState([]);
//   const [selectedAccountId, setSelectedAccountId] = useState(id);
//   const [formData, setFormData] = useState({
//     Username: '',
//     Password: '',
//     Notes: '',
//     URL: ''
//   });

//   // useEffect(() => {
//   //   axios.get('https://lastback.vercel.app/account')
//   //     .then(response => {
//   //       setAccounts(response.data);
//   //       const account = response.data.find(acc => acc._id === selectedAccountId);
//   //       if (account) {
//   //         setFormData({
//   //           Username: account.Username,
//   //           Password: account.Password,
//   //           Notes: account.Notes,
//   //           URL: account.URL
//   //         });
//   //       }
//   //     })
//   //     .catch(error => {
//   //       console.error('There was an error fetching the data!', error);
//   //     });
//   // }, [selectedAccountId]);


// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const token = localStorage.getItem('token'); // Assuming the JWT token is stored in localStorage
//       if (!token) {
//         console.error('No token found! Please login.');
//         return;
//       }

//       // Make the GET request with the Authorization header
//       const response = await axios.get('https://lastback.vercel.app/account', {
//         headers: {
//           Authorization: `Bearer ${token}` // Include JWT token in the request
//         }
//       });

//       // Update the state with the fetched data
//       setAccounts(response.data);

//       const account = response.data.find(acc => acc._id === selectedAccountId);
//       if (account) {
//         setFormData({
//           Username: account.Username,
//           Password: account.Password,
//           Notes: account.Notes,
//           URL: account.URL
//         });
//       }
//     } catch (error) {
//       console.error('There was an error fetching the data!', error);
//     }
//   };

//   // Call the fetchData function
//   fetchData();
// }, [selectedAccountId]);


  
//   const handleAccountChange = (event) => {
//     setSelectedAccountId(event.target.value);
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };



//   const handleSubmit = (event) => {
//   event.preventDefault();

//   // Get the token from localStorage
//   const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
//   if (!token) {
//     console.error('No token found! Please login.');
//     return;
//   }

//   // Make the PUT request with the Authorization header
//   axios.put(`https://lastback.vercel.app/account/${selectedAccountId}`, formData, {
//     headers: {
//       Authorization: `Bearer ${token}` // Include JWT token in the request
//     }
//   })
//     .then(response => {
//       console.log('Data updated successfully!');
//       //navigate('/'); // Navigate back to the home page if necessary
//     })
//     .catch(error => {
//       console.error('There was an error updating the data!', error);
//     });
// };


//   // const handleSubmit = (event) => {
//   //   event.preventDefault();
//   //   axios.put(`https://lastback.vercel.app/account/${selectedAccountId}`, formData)
//   //     .then(response => {
//   //       //navigate('/'); // Navigate back to the home page
//   //     })
//   //     .catch(error => {
//   //       console.error('There was an error updating the data!', error);
//   //     });
//   // };

//   // const handleSubmit2 = (event) => {
//   //   event.preventDefault();
//   //       navigate('/password'); // Navigate back to the home page
//   // };

//   return (
//     <div className='container'>
//       <h1 className='h2'>PASSWORD MANAGER</h1>
//       <p>This app helps you securely manage and track your social media account credentials.</p>
//       <button onClick={handleSubmit2} className='butt'> Add Account</button>
//       <div>
//         <select className='sel' value={selectedAccountId} onChange={handleAccountChange}>
//           <option value="">Select already existed account</option>
//           {accounts.map(account => (
//             <option key={account._id} value={account._id}>{account.Description}</option>
//           ))}
//         </select>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label className='label'>Username:</label>
//           <input className='input'
//             type="text"
//             name="Username"
//             value={formData.Username}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label className='label'>Password:</label>
//           <input className='input'
//             type="text"
//             name="Password"
//             value={formData.Password}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label className='label'>URL:</label>
//           <input className='input'
//             type="text"
//             name="URL"
//             value={formData.URL}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label className='label'>Notes:</label>
//           <input className='input'
//             type="text"
//             name="Notes"
//             value={formData.Notes}
//             onChange={handleChange}
//           />
//         </div>
       
//         <button type="submit" className='butt'>Edit Above & Update</button>
       
//       </form>
//     </div>
//   );
// }

// export default EditRecord;
