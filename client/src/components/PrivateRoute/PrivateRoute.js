import React from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const PrivateRoute = ({children, roles = []}) => {
    const {isAuth, user} = useSelector(s => s.auth)

    return (
        isAuth && roles.includes(user?.role)
            ? children
            : <Navigate to='/'/>
    );
};

export default PrivateRoute;