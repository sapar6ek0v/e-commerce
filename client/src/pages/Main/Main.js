import React, {useEffect} from 'react';
import './Main.css'
import MealCard from "../../components/MainProductCard/MealCard";
import {useDispatch, useSelector} from "react-redux";
import {searchValue} from "../../redux/actionCreators/productCreators.js";


const Main = () => {
    const dispatch = useDispatch()
    const {products, cart, search} = useSelector((store) => store.products)


    useEffect(() => {
        dispatch(searchValue(''))
    }, [dispatch])

    return (
        <div className='main-page'>
            <div className='container'>
                {
                    !products?.filter(it => it.title?.toLowerCase().includes(search?.toLowerCase()) || search?.trim() === '').length
                    &&
                    <div className='text-center text-black fw-bold text-uppercase'>Ничего не найдено</div>
                }
                <div className='row'>
                    {
                        products?.filter(it => it.title?.toLowerCase().includes(search?.toLowerCase()) || search?.trim() === '').map(it => {
                            const count = cart[it._id]?.count || 0
                            return (
                                <MealCard food={it} count={count} key={it._id}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Main;