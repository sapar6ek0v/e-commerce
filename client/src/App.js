import './css/App.css';
import {Route, Routes} from "react-router-dom";
import Main from "./pages/Main/Main";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import './css/App.css'
import CartProductPage from "./pages/CartProductPage/CartProductPage";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProducts, getRates} from "./redux/actionCreators/productCreators.js";
import Loader from "./components/Loader/Loader";
import axios from "axios";
import {logOut, signIn} from "./redux/actionCreators/authCreators.js";
import SignUp from "./pages/SignUp/SignUp.js";
import SignIn from "./pages/SignIn/SignIn.js";
import AnonymousRoute from "./components/AnonymousRoute/AnonymousRoute.js";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.js";
import AdminPage from "./pages/AdminPage/AdminPage.js";
import ProductPage from "./pages/ProductPage/ProductPage.js";
import StripePage from "./pages/StripePage/StripePage.js";


function App() {
    const dispatch = useDispatch()
    const {isLoading} = useSelector(s => s.products)
    const {isAuth, token} = useSelector(s => s.auth)

    useEffect(() => {
        dispatch(getRates())
    }, [dispatch])

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    useEffect(() => {
       if (token) {
           axios('/api/v1/auth/user/authenticate')
               .then(({data}) => dispatch(signIn(data)))
               .catch(e => {
                   // dispatch(logOut())
                   console.log(e.response?.data?.message || 'Error!')
               })
       }
    }, [isAuth])

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className='wrapper'>
            <div className='main'>
                <Header/>

                    <Routes>
                        <Route path='/' element={<Main/>}/>
                        <Route path='/cart-meals' element={<CartProductPage/>} />
                        <Route path='/product/:id' element={<ProductPage/>} />
                        <Route path='/payment' element={<StripePage/>} />
                        <Route path='/sign_up' element={<AnonymousRoute><SignUp/></AnonymousRoute>} />
                        <Route path='/sign_in' element={<AnonymousRoute><SignIn/></AnonymousRoute>} />
                        <Route path='/admin_page' element={<PrivateRoute roles={['admin']}><AdminPage/></PrivateRoute>} />
                    </Routes>
            </div>

            <Footer />
        </div>
    );
}

export default App;
