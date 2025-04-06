import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./AuthPages.css"

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
      const response = await axios.post('http://localhost:8891/update', {
        email:email,
        password: password,
      });

      if (response.data.status === 'success') {
        alert('Password reset successful');
        navigate('/login');
      } else {
        alert(response.data.message);
        console.log(response.data.message);
      }
  };
  return (
    <div className="auth-container">
      <div className="auth-content">
      <h2>Covid-19 Dashboard</h2>
      <p>Please Enter the Valid Password</p>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>
      <input type="password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} required/>
      <input type="password" placeholder="Confirm New Password" onChange={(e) => setConfirmPassword(e.target.value)} required/>
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
    </div>
  )
}

export default ResetPassword