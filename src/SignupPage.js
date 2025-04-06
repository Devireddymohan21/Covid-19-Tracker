import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthPages.css'; 
const SignupPage = () => {
    const [username,setUsername]=useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        if (password !== confirmPassword) {
          alert('Passwords do not match!');
          return;
        }
        if (!email || !password){
            alert('invalid credintials');
            return;
        }
        else{
        axios.post('http://localhost:8891/signup', {username, email, password });
          alert('Your Registration is Successfully Completed');
          navigate('/login');
        }
    };


    return (
        <div className="auth-container">
            <div className="auth-content">
                <h2>Covid-19 Dashboard</h2>
                <p>Enter The Complete Details</p>
                {error && <p className="error">{error}</p>}
                <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                />
                <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required
                />
                <button onClick={handleRegister}>Signup</button>
                <p> Already have an account? <a href="#" onClick={() => navigate('/login')}>Login</a></p>
            </div>
            </div>
    );
};

export default SignupPage;