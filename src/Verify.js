import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./AuthPages.css";

const Verify = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      window.alert('Enter a valid OTP');
    } else {
      try {
        const response = await axios.post('http://localhost:8891/verify', {
          otp: otp,
        });

        if (response.data.status === 'success') {
          localStorage.setItem('token', response.data.token); 
          alert('OTP verified');
          navigate('/reset-password'); 
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError('You are not registered or invalid credentials');
      }
    }
  };

  return (
    <div>
      <div className="auth-container">
        {error && <p className="error">{error}</p>}
        <div className="auth-content">
        <h2>Covid-19 Dashboard</h2>
        <p>Please Enter the Valid OTP</p>
          <input
            type="text"
            placeholder="Enter your OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </div>
        
      </div>
    </div>
  );
}

export default Verify;
