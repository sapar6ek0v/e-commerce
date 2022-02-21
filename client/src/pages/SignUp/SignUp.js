import React from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import './Sign_Up.css'


const SignUp = () => {
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()

    const addUser = (data) => {
        axios.post('/api/v1/auth/user/sign_up', data)
            .then(({data}) => {
                alert(data.message)
                navigate('/sign_in')
            })
            .catch(e => alert(e.response?.data?.message || "Error"))
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit(addUser)} className='sign-form'>
                <div className="form-group mb-3">
                    <label htmlFor="name">Name</label>
                    <input {...register('name')} type="text" className="form-control" id="name" aria-describedby="emailHelp"
                           placeholder="Enter name"/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email address</label>
                    <input {...register('email')} type="email" className="form-control" id="email" aria-describedby="emailHelp"
                           placeholder="Enter email"/>
                </div>
                <div className="form-group mb-5">
                    <label htmlFor="password">Password</label>
                    <input {...register('password')} type="password" className="form-control" id="password" placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default SignUp;