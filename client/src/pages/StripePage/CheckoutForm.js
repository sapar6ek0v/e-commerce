import React, {useState} from 'react';
import {CardElement, useStripe, useElements,} from '@stripe/react-stripe-js';
import axios from "axios";
import ModalAlert from "../../components/ModalAlert/ModalAlert.js";
import {useSelector} from "react-redux";
import './ChecoutForm.css'
import {useNavigate} from "react-router-dom";
import CheckoutCard from "../../components/CheckoutCard/CheckoutCard.js";


const CheckoutForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    const [error, setError] = useState(null)
    const [modalIsOpen, setIsOpen] = useState(false)
    const {rates, currentRate, cart} = useSelector(s => s.products)
    const {user, isAuth} = useSelector(s => s.auth)
    const navigate = useNavigate()

    const amount = Object.values(cart).reduce((acc, it) => {
        return (acc + it.price * (it.count * rates[currentRate[0]]).toFixed(2))
    }, 0)

    const handleSubmit = async (event) => {
        event.preventDefault()

        setError(null)

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        })

        if (error) {
            setError(error.message)
            openModal()
        } else {
            const {id} = paymentMethod
            const products = Object.values(cart).map(it => it.title).toString()

            await axios.post('/api/v1/payment', {
                id: id,
                amount: amount.toString(),
                user: user.name,
                products
            }).then(() => {
                openModal()
            }).catch(e => alert(e.response?.data?.message || 'Error'))
        }
    }

    function openModal() {
        setIsOpen(true);
    }


    return (
        <div className='container py-5'>
            <h4 className='mb-4 text-decoration-underline'>About your products :</h4>

            <CheckoutCard amount={amount} />

            <h4 className='mb-3 text-decoration-underline'>Pay for the goods :</h4>
            {
                isAuth
                ? <form onSubmit={handleSubmit} className='payment-form'>
                        <CardElement/>
                        <hr/>
                        <div className='text-end'>
                            <button className='payment-btn' type="submit" disabled={!stripe || !elements}>
                              Pay
                            </button>
                        </div>
                  </form>
                    : <button onClick={() => navigate('/sign_up')} className='payment-btn'>Pay</button>
            }
            <ModalAlert modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} title={error ? error : "Thank you for paying"}/>
        </div>
    );
};

export default CheckoutForm;