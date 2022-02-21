import React, {useState} from 'react';
import axios from "axios";
import {useDispatch} from "react-redux";
import {signIn} from "../../redux/actionCreators/authCreators.js";

const SignIn = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('234')
    const [password, setPassword] = useState('')

    const signInClick = () => {
        axios.post('/api/v1/auth/user/sign_in', {email, password})
            .then(({data}) =>{
                dispatch(signIn(data))
            })
            .catch(e => alert(e.response?.data?.message || "Error!"))
    }

    return (
        <div className='container'>
            <form className='sign-form'>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email address</label>
                    <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="email" aria-describedby="emailHelp"
                           placeholder="Enter email"/>
                </div>
                <div className="form-group mb-5">
                    <label htmlFor="password">Password</label>
                    <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="password" placeholder="Password"/>
                </div>
                <button onClick={signInClick} type="button" className="btn btn-primary">Sign IN</button>
            </form>
        </div>
    );
};

export default SignIn;