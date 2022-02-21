import React from 'react';
import './BurgerMenu.css'
import {useDispatch, useSelector} from "react-redux";
import {exchangeRate, searchValue, sortByName, sortByPrice} from "../../redux/actionCreators/productCreators.js";
import {logOut} from "../../redux/actionCreators/authCreators.js";
import {useNavigate} from "react-router-dom";


const BurgerMenu = ({setShowButtons}) => {
    const {search} = useSelector((store) => store.products)
    const dispatch = useDispatch()
    const {isAuth} = useSelector(s => s.auth)
    const navigate = useNavigate()

    const changeRate = (rate) => {
        setShowButtons(false)
        dispatch(exchangeRate(rate))
    }

    const changeQueuePrice = () => {
        setShowButtons(false)
        dispatch(sortByPrice())
    }

    const changeQueueName = () => {
        setShowButtons(false)
        dispatch(sortByName())
    }

    const onChange = (value) => {
        dispatch(searchValue(value))
    }

    const logOutClick = () => {
        dispatch(logOut())
    }

    return (
        <div onClick={() => setShowButtons(false)} className='burger-menu-bg'>
            <div onClick={(e) => e.stopPropagation()} className='burger-menu'>
                {
                    !search &&
                    <>
                        {
                            !isAuth
                                ? <div className='d-flex justify-content-between mb-4'>
                                    <button className='burger-menu-btn' onClick={() => navigate('/sign_up')}>Sign Up</button>
                                    <button className='burger-menu-btn' onClick={() => navigate('/sign_in')}>Sign IN</button>
                                  </div>
                                : <div className='mb-4 text-center'>
                                    <button className='burger-menu-btn' onClick={logOutClick}>Log Out</button>
                                  </div>
                        }
                        <div className='mb-4 d-flex justify-content-between'>
                            <button onClick={() => changeRate(["USD", "USD"])} className='burger-menu-btn'>USD</button>
                            <button onClick={() => changeRate(["RUB", "RUB"])} className='burger-menu-btn'>RUB</button>
                            <button onClick={() => changeRate(["KGS", "KGS"])} className='burger-menu-btn'>KGS</button>
                        </div>
                        <div>
                            <div className='burger-menu-title'>Sort:</div>
                            <div className='d-flex justify-content-between'>
                                <button onClick={changeQueuePrice} className='burger-menu-btn'>By Price</button>
                                <button onClick={changeQueueName} className='burger-menu-btn'>By Name</button>
                            </div>
                        </div>
                    </>
                }
                <div className='py-3'>
                    <div className='burger-menu-title'>Search:</div>
                    <input
                        className='burger-menu-input'
                        onChange={(e) => onChange(e.target.value)}
                        type="text"
                    />
                </div>
            </div>

        </div>
    );
};

export default BurgerMenu;