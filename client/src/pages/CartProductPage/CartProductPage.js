import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import ProductCart from "../../components/ProductCard/ProductCart";
import {deleteAllCart} from "../../redux/actionCreators/productCreators.js";
import './CartProductPage.css'

const CartProductPage = () => {
    const {rates, currentRate, cart} = useSelector(s => s.products)

    const dispatch = useDispatch()


    return (
        <div className='cart-page'>
            <div className='container'>
                {
                    Object.values(cart).length
                        ? <table className="table table-bordered">
                            <thead className='cart-table-head'>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total cost</th>
                            </tr>
                            </thead>
                            {
                                Object.values(cart).map(it => {
                                    return (
                                        <ProductCart key={it._id} product={it} />
                                    )
                                })
                            }
                            <tfoot className='cart-table-foot'>
                            <tr>
                                <td>  </td>
                                <td className='text-center'>
                                    <button className='cart-table-foot-btn' onClick={() => dispatch(deleteAllCart())}>Delete All</button>
                                </td>
                                <td>
                                    <span className='cart-table-foot-title'>Total :</span>
                                    <span className='px-2'>
                                        {
                                            Object.values(cart).reduce((acc, it) => {
                                                return (acc + it.price * (it.count * rates[currentRate[0]]).toFixed(2))
                                            }, 0)
                                        }
                                        <span className='px-2'>{[currentRate[1]]}</span>
                                    </span>
                                </td>
                            </tr>
                            </tfoot>
                        </table>
                        : <div className='text-center fw-bold text-uppercase '>Cart is empty</div>
                }
            </div>
        </div>
    );
};

export default CartProductPage;