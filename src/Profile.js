import React from 'react'
import './nav.css'
const Profile = () => {
    let email=sessionStorage.getItem("email");
    let username=sessionStorage.getItem("username");
  return (
    <div className='drop'>
    <div className='dropdown-menu'>        
        <h2>User Credintials</h2>
        <img src='/images/user.jpg'/>
        <h3>Your Account Details</h3>
        <br/>
        <p>Name: {username}</p>
        <p>Email: {email}</p>
    </div>
    </div>
  )
}

export default Profile