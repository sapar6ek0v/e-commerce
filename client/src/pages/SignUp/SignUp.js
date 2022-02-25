import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import './Sign_Up.css'
import ModalAlert from "../../components/ModalAlert/ModalAlert.js";


const SignUp = () => {
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()
    const [modalIsOpen, setIsOpen] = useState(false);


    const addUser = (data) => {
        axios.post('/api/v1/auth/user/sign_up', data)
            .then(() => {
                openModal()
                navigate('/sign_in')
            })
            .catch(e => alert(e.response?.data?.message || "Error"))
    }

    function openModal  ()  {
        setIsOpen(true);
    }


    return (
        <div className='container signup-block'>

            <form onSubmit={handleSubmit(addUser)} className='signup-form'>
                    <h3 className='signup-title'>Welcome!</h3>

                    <div className="form-group mb-3">
                        <label className='signup-subtitle' htmlFor="name">Name</label>
                        <input {...register('name', {required: true})} type="text" className="form-control" id="name" aria-describedby="emailHelp"
                               placeholder="Enter name"/>
                    </div>
                    <div className="form-group mb-3">
                        <label className='signup-subtitle' htmlFor="email">Email address</label>
                        <input {...register('email', {required: true})} type="email" className="form-control" id="email" aria-describedby="emailHelp"
                               placeholder="Enter email"/>
                    </div>
                    <div className="form-group mb-3">
                        <label className='signup-subtitle' htmlFor="password">Password</label>
                        <input {...register('password', {required: true})} type="password" className="form-control" id="password" placeholder="Password"/>
                    </div>
                    <div className='text-center'>
                        <p className='text-end'>
                            <Link  to='/sign_in'>Sign In</Link>
                        </p>
                        <button type="submit" className="signup-btn">Sign up</button>
                    </div>
                </form>

            <ModalAlert modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} title={'Successful!'}/>

        </div>
    );
};

export default SignUp;