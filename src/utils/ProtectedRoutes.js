import {Outlet,Navigate} from 'react-router-dom';
import React from 'react'

const ProtectedRoutes = () => {
    const user = sessionStorage.getItem('login');
    if(user==='true'){
        return <Outlet/>
    }
    else{
        alert('Please Login to Continue');
        return <Navigate to = '/login'/>
    }

}

export default ProtectedRoutes