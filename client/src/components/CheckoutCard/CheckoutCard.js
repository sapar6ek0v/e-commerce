import React from 'react';
import {useSelector} from "react-redux";

const CheckoutCard = ({amount}) => {
    const {rates, currentRate, cart} = useSelector(s => s.products)


    return (
        <>
            <table className="table table-striped mb-5 table-shadow">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                </tr>
                </thead>
                <tbody>
                {
                    Object.values(cart).map((it, idx) => {
                        return (
                            <tr>
                                <th scope="row">{idx + 1}</th>
                                <td>{it.title}</td>
                                <td>{it.count}</td>
                                <td>{(it.price * it.count * rates[currentRate[0]]).toFixed(2)}<span
                                    className='px-2'>{currentRate[1]}</span></td>
                            </tr>
                        )
                    })
                }
                <tr>
                    <th></th>
                    <td className='fw-bold text-uppercase'>Total :</td>
                    <td></td>
                    <td className='fw-bold text-uppercase'>{amount}<span className='px-2'>{currentRate[1]}</span></td>
                </tr>
                </tbody>
            </table>
        </>
    );
};

export default CheckoutCard;