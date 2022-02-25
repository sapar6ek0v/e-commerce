import React, {useState} from 'react';
import axios from "axios";
import {useDispatch} from "react-redux";
import {signIn} from "../../redux/actionCreators/authCreators.js";
import {Link} from "react-router-dom";

const SignIn = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signInClick = () => {
        axios.post('/api/v1/auth/user/sign_in', {email, password})
            .then(({data}) =>{
                dispatch(signIn(data))
            })
            .catch(e => alert(e.response?.data?.message || "Error!"))
    }

    return (
        <div className='container signup-block'>

            <form className='signup-form'>

                <div className="form-group mb-3">
                    <label className='signup-subtitle' htmlFor="email">Email address</label>
                    <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="email" aria-describedby="emailHelp"
                           placeholder="Enter email"/>
                </div>

                <div className="form-group mb-3">
                    <label className='signup-subtitle' htmlFor="password">Password</label>
                    <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="password" placeholder="Password"/>
                </div>

                <div className='text-center'>
                    <p className='text-end'>
                        <Link to='/sign_up'>Sign Up</Link>
                    </p>
                    <button onClick={signInClick} type="button" className="signup-btn">Sign In</button>
                </div>

            </form>
        </div>
    );
};

export default SignIn;