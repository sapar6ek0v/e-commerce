import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
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

    const onClick = () => {
        navigate(`/cart-meals`)
    }

    return (
        <>
            <header className='sticky-top'>
                <div className='container d-flex py-3 justify-content-between'>
                    <div>
                        <button onClick={() => navigate('/')} className='header-btn'>Home</button>
                        <button onClick={onClick} className='header-btn'>Cart</button>
                        {
                            isAuth && user?.role === 'admin' && <Link className='header-btn text-decoration-none' to='/admin_page' >Add Product</Link>
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