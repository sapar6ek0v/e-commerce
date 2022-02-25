import React from 'react';
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm.js";


const stripe_key = 'pk_test_51KWFM6Ks4xt4T7VvCQU5QYFtR8pzUhu62PaOjEGBSfBvLyspPnsSd8OkLZilcj5wdyz9LQvHPwRtgQrwZSNu9Bzy004dBQc8A8'

const stripePromise  = loadStripe(stripe_key);


const StripePage = () => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm/>
            </Elements>
        </div>
    );
};

export default StripePage;