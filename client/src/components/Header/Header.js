import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import './Header.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { CSSTransition } from 'react-transition-group';
import {useSelector} from "react-redux";


const Header = () => {
    const navigate = useNavigate()
    const {user, isAuth} = useSelector(s => s.auth)
    const [showButtons, setShowButtons] = useState(false)


    return (
        <>
            <header className='sticky-top'>
                <div className='container d-flex py-3 justify-content-between'>
                    <div>
                        <button onClick={() => navigate('/')} className='header-btn'>Home</button>
                        <button onClick={() => navigate(`/cart-meals`)} className='header-btn'>Cart</button>
                        {
                            isAuth && user?.role === 'admin' && <button onClick={() => navigate('/admin_page')} className='header-btn'>Add Product</button>
                        }
                    </div>
                    <div className='d-flex align-items-center'>
                        <div className='me-4'>
                            {
                                user && <span className='text-white'>{user?.name}</span>
                            }
                        </div>
                        <button onClick={() => setShowButtons(!showButtons)} className='header-btn'>
                            <FontAwesomeIcon icon={faBars}/>
                        </button>
                    </div>
                </div>
            </header>
            <CSSTransition
                in={showButtons}
                timeout={400}
                classNames="show"
                unmountOnExit
            >
                <BurgerMenu setShowButtons={setShowButtons}/>

            </CSSTransition>
        </>
    );
};

export default Header;