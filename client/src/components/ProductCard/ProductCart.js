import React, {useState} from 'react';
import ProductButtons from "../ProductButtons/ProductButtons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {deleteFromCart} from "../../redux/actionCreators/productCreators.js";
import './ProductCart.css'
import ModalImage from "../ModalImage/ModalImage";
import {CSSTransition} from "react-transition-group";

const ProductCart = ({product}) => {
    const {rates, currentRate, cart} = useSelector(s => s.products)
    const [showImage, setShowImage] = useState(false)

    const dispatch = useDispatch()
    return (
        <>
            <tbody className='cart-table'>
            <tr>
                <td className='col-5 px-4 py-3 md-table'>
                    <img onClick={() => setShowImage(true)} className='w-25 cart-img ' src={product.image} alt=""/>
                    <div className='d-inline-block md-block'>
                        <div className='cart-table-title'>
                            {product.title}
                        </div>
                        <div className='fw-bold'>
                            {(product.price * rates[currentRate[0]]).toFixed(2)} {currentRate[1]}
                        </div>
                    </div>
                </td>
                <td className='col-4 px-4 py-3 md-table'>
                    <div className='buttons-table-block'>
                        <ProductButtons cart={cart} food={product} count={product.count}/>
                        <button
                            className='cart-table-btn'
                            onClick={() => dispatch(deleteFromCart(product._id))}
                        >
                            <FontAwesomeIcon icon={faTrashAlt}/>
                        </button>
                    </div>
                </td>
                <td className='col-4 px-4 py-3 md-table'>
                    <div className='cart-table-price'>
                        {(product.price *  product.count * rates[currentRate[0]]).toFixed(2)}
                        <span className='px-2'>{currentRate[1]}</span>
                    </div>
                </td>
            </tr>
            </tbody>
            <CSSTransition
                in={showImage}
                timeout={300}
                classNames="show-img"
                unmountOnExit
            >
                <ModalImage food={product} setShowImage={setShowImage}/>
            </CSSTransition>
        </>
    )
        ;
};

export default ProductCart;