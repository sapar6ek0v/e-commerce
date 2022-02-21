import React from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const AnonymousRoute = ({children}) => {
    const {isAuth} = useSelector(s => s.auth)

    return (
        !isAuth
            ? children
            : <Navigate to='/'/>
    );
};

export default AnonymousRoute;