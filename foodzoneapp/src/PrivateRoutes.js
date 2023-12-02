import { Navigate, Outlet } from 'react-router-dom'
import React, { useState } from "react";

const PrivateRoutes = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(true);
    // Add the authentication to check if user info exits in localstorage

    fetch('https://foodzone-gd25.herokuapp.com/username', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
        mode: 'cors',
        credentials: 'include'
    }).then(res => {
        setIsLoggedIn(res.status === 401 ? false : true)
    })

    return (
        isLoggedIn ? <Outlet /> : <Navigate to="/" />
    )
}

export default PrivateRoutes;