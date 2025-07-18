import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        // If user is not logged in, redirect to login
        return <Navigate to="/login" />;
    }

    // If logged in, render the page
    return children;
};

export default PrivateRoute;
