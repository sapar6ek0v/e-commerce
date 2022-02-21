import React from 'react';
import {addToCart, deleteCart} from "../../redux/actionCreators/productCreators.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinusSquare, faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";

const ProductButtons = ({food, count, cart}) => {
    const dispatch = useDispatch()

    return (
        <>
            <button onClick={() => dispatch(addToCart(food))}
                    className='meal-card-btn btn-green'>
                <FontAwesomeIcon icon={faPlusSquare}/>
            </button>
            <div className='meal-card-input'>
                {count}
            </div>
            <button onClick={() => dispatch(deleteCart(food))}
                    className='meal-card-btn btn-red'>
                <FontAwesomeIcon icon={faMinusSquare}/>
            </button>
        </>
    );
};

export default ProductButtons;