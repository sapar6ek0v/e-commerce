import React from 'react';
import './ModalImage.css'

const ModalImage = ({setShowImage, food}) => {
    return (
        <div onClick={() => setShowImage(false)} className='modal-bg'>
            <div className='d-flex justify-content-center align-items-center h-100'>
                <img src={food.image} alt={food.title}/>
            </div>
        </div>
    );
};

export default ModalImage;