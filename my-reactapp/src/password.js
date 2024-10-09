

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

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Create a new account object
    const newAccount = {
      Description: description,
      Username: username,
      Password: password,
      URL: url,
      Notes: notes
    };

    // Send POST request to the server to add a new password entry
    axios.post('https://lastback.vercel.app/account', newAccount)
      .then(response => {
        setMessage('Password added successfully!');
        // Clear form fields after successful submission
        setDescription('');
        setUsername('');
        setPassword('');
        setUrl('');
        setNotes('');
      })
      .catch(error => {
        console.error('There was an error adding the password!', error);
        setMessage('Failed to add password. Please try again.');
      });
  };

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
