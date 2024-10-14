import React, { useState } from 'react';
import './AuthPages.css'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const handleForgotPassword = async () => {
          const response = await axios.post('http://localhost:8891/sendemail', { email });
            if(response.data.status==='success'){
                alert("OTP has been sent to your Email ID");
                navigate('/verify'); 
            }
            else{
                alert(response.data.message);
                console.log(response.data.message);
            }
      };

    return (
        <div className="auth-container">
            <div className="auth-content">
                <h2>Covid-19 Dashboard</h2>
                <p>Please Enter the Valid Email</p>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                />
                <button onClick={handleForgotPassword}>Send OTP</button>

                <p>Remembered your password? <a href="/login">Login</a></p>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
