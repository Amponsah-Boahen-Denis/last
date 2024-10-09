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

  useEffect(() => {
    axios.get('https://lastback.vercel.app/?vercelToolbarCode=n0xyhfXVTKNV-m3/account')
      .then(response => {
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
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
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

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`https://lastback.vercel.app/?vercelToolbarCode=n0xyhfXVTKNV-m3/account/${selectedAccountId}`, formData)
      .then(response => {
        //navigate('/'); // Navigate back to the home page
      })
      .catch(error => {
        console.error('There was an error updating the data!', error);
      });
  };

  const handleSubmit2 = (event) => {
    event.preventDefault();
        navigate('/password'); // Navigate back to the home page
  };

  return (
    <div className='container'>
      <h1 className='h2'>PASSWORD MANAGER</h1>
      <p>This app helps you securely manage and track your social media account credentials.</p>
      <button onClick={handleSubmit2} className='butt'> Add Account</button>
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
