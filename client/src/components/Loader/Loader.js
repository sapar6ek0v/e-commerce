import React from 'react';
import {Bars} from "react-loader-spinner";
import './Loader.css'

const Loader = () => {
    return (
        <div className='loader'>
            <Bars heigth="100" width="100" color="yellow" arialLabel="loading-indicator" />
        </div>
    );
};

export default Loader;