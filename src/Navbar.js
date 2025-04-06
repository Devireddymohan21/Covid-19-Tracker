import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import "./nav.css";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    let email=sessionStorage.getItem("email");
    let username=sessionStorage.getItem("username");
    let p='';
    if(email){
        console.log(email,username);
        p=username.charAt(0).toUpperCase();
    }
    const checkLoginStatus = () => {
        const login = sessionStorage.getItem("login");
        const loginStatus = JSON.parse(login); 
        setIsLoggedIn(loginStatus);
    }
    
        const toggleDropdown = () => {
            setIsDropdownVisible(!isDropdownVisible);
        };

        const handleLogout = () => {
            sessionStorage.setItem("login",false);
            setIsLoggedIn(false);
            setIsDropdownVisible(false); 
        };
    
    useEffect(() => {
        checkLoginStatus();
    });
    
    console.log("LOGGED STATUS:", isLoggedIn, typeof isLoggedIn)
    console.log(sessionStorage.getItem("login"));
  return (
    <div>
    <nav >
        <div  className='logo'>
            Covid_Dashboard 
        </div>
        <ul className='navbar'>
            <li className='nav-link'>
                <Link to='/home' style={{color:'aliceblue',textDecoration: 'none'}}>Home</Link>
            </li>
            <li className='nav-link'>
                <Link to='/statistics' style={{color:'aliceblue',textDecoration: 'none'}}>Statistics</Link>
            </li>
            <li className='nav-link'>
                <Link to='/history' style={{color:'aliceblue',textDecoration: 'none'}}>History</Link>
            </li>
            <li className='nav-link'>
              <Link  to="https://www.who.int/health-topics/coronavirus#tab=tab_1t" target="_blank" style={{color:'aliceblue',textDecoration: 'none'}}>About</Link>
            </li>
            
           {isLoggedIn ? (
            <li className='nav-link'>
                       <div className='sub3'>
                        <div className='suba'>
                            <div className='subb'>
                       <button className="profile-circle"  onClick={toggleDropdown} >
                            {p}
                        </button>
                        {isDropdownVisible && (
                            <div className="dropdown-enu">
                            
                                <hr/>
                                    <Link to='/profile' className='dropdown-comp'>
                                    <img src='images/profile.png'/>
                                    My Profile
                                    </Link>
                                    <Link to='/help' className='dropdown-comp'>
                                    <img src='images/help.png'/>
                                    Help & Support
                                    </Link>
                                    <Link to='/settings' className='dropdown-comp'>
                                    <img src='images/setting.png'/>
                                    Settings
                                    </Link>
                                    <Link to='/home' className='dropdown-comp' onClick={handleLogout}>
                                    <img src='images/logout.png'/>
                                    Logout
                                    </Link>
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            </li>
                ) : (
                           <li className='nav-link'>
                        <Link to='/login' style={{color:'aliceblue',textDecoration: 'none'}}>Login</Link></li>
                )}
        </ul>
          
    </nav>
  </div>
    
  );
};

export default Navbar;
