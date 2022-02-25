import React, {useState} from 'react';
import './MealCard.css'
import ModalImage from "../ModalImage/ModalImage";
import ProductButtons from "../ProductButtons/ProductButtons";
import {useSelector} from "react-redux";
import { CSSTransition } from 'react-transition-group';
import {Link} from "react-router-dom";


const MealCard = ({food, count}) => {
    const {rates, currentRate} = useSelector(s => s.products)
    const [showImage, setShowImage] = useState(false)


    return (
        <>
            <div className='col-sm-6 col-md-4 col-lg-3 mb-4 m-col'>
                <div className='meal-card'>
                    <div>
                        <div onClick={() => setShowImage(true)}>
                            <img src={food.image} alt={food.title} className='card-img'/>
                        </div>

                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='d-flex align-items-center'>
                                <div className='meal-card-title'>{
                                    <Link to={`/product/${food._id}`} className='meal-card-subtitle'>{food.title}</Link>
                                }</div>
                            </div>
                            <div className='meal-card-price'>
                                {(food.price * rates[currentRate[0]]).toFixed(2)}
                                <span className='text-white px-1'>{currentRate[1]}</span>
                            </div>
                        </div>
                    </div>
                    <div className='buttons'>
                        <ProductButtons count={count} food={food} />
                    </div>
                </div>
            </div>
            <CSSTransition
                in={showImage}
                timeout={300}
                classNames="show-img"
                unmountOnExit
            >
                <ModalImage food={food} setShowImage={setShowImage}/>
            </CSSTransition>
        </>

    );
};

export default MealCard;