import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthPages.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleLogin = async () => {
      const response = await axios.post('http://localhost:8891/login', {
        email:email,
        password: password
      });

      if (response.data.status === 'success') {
        let token=(response.data.token);
        let mang=(response.data.user.username);
        let mail=(response.data.user.email);
        sessionStorage.setItem('username',mang);
        localStorage.setItem('token',token); 
        sessionStorage.setItem('email',mail);
        sessionStorage.setItem('login',true);
        alert("Login Successful");
        navigate('/home');
      } else {
        alert(response.data.message);
        console.log(response.data.message);
      }
  };

    return (
        <div className="auth-container">
            <div className="auth-content">
            <h2>Covid-19 Dashboard</h2>
            <p>To Explore this Dashboard Please Signin first !...</p>
                {error && <p className="error">{error}</p>}
                <input 
                    type="email" 
                    placeholder="Enter your Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                />
                
                <input 
                    type="password" 
                    placeholder="Enter your Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                />

                <button onClick={handleLogin}>Login</button>
                <a href="/forgotpassword">Forgot Password?</a>
                <p>Don't have an account?<a href="/signup">Sign Up</a></p>
               
            </div>
        </div>
    );
};

export default LoginPage;
