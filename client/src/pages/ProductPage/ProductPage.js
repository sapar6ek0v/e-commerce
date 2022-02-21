import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {deleteFromCart, getProducts} from "../../redux/actionCreators/productCreators.js";
import './ProductPage.css'


const ProductPage = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [product, setProduct] = useState({})
    const [text, setText] = useState('')
    const {user, isAuth} = useSelector(s => s.auth)

    const deleteComment = (id) => {
        axios.delete(`/api/v1/comments/delete/${id}`)
            .then(() => {
            })
            .catch(() => console.log('not Delete'))
    }


    const saveComment = () => {

        const comment = {
            text,
            author: user._id,
            product: id
        }

        axios.post('/api/v1/comments/save', comment)
            .then(({data}) => {
                setProduct({
                    ...product,
                    comments: [...product.comments, {...data.comment, author: {name: user.name}}]
                })
                setText('')
            })
            .catch(() => console.log('Your comment didn\'t add!'))
    }


    const deleteProduct = (id) => {
        axios.delete(`/api/v1/products/delete/${id}`)
            .then(() => {
                navigate('/')
                dispatch(getProducts())
                dispatch(deleteFromCart(id))
            })
            .catch(e => console.log(e))
    }


    useEffect(() => {
        axios(`/api/v1/products/${id}`)
            .then(({data}) => {
                setProduct(data)
                console.log(data)
            })
            .catch(e => console.log(e))
    }, [id])


    return (
        <div className='container'>
            <div className='product-page'>
                <div className='d-flex '>
                    <img className='product-img' src={product.image} alt={product.title}/>
                    <div className='px-5 d-flex align-items-center w-100'>
                        <div>
                            <h3 className='product-title'>{product.title}</h3>
                            <div className='product-subtitle'>Description : {product.description}</div>
                            <div className='product-subtitle'>Price : {product.price}</div>
                        </div>
                        <div className='product-btns'>
                            {
                                isAuth
                                && user?.role === 'admin'
                                && <button onClick={() => deleteProduct(product._id)} className='product-btn'>delete</button>
                            }
                        </div>
                    </div>
                </div>
                {
                    isAuth
                    && <div className='mb-5 py-5'>
                        <textarea value={text} onChange={e => setText(e.target.value)} rows="6" className='product-text' placeholder='For comment...'> </textarea>
                        <button onClick={saveComment} className='product-btn-green'>Add</button>
                    </div>
                }
                <div className='py-5'>
                    {
                        product?.comments?.map(it => {
                            return (
                                <div key={it._id} className='product-comment'>
                                    <div>
                                        <div className='comment-title'>{it.text}</div>
                                        <div className='comment-author'>{it.author?.name}</div>
                                    </div>
                                    {
                                        isAuth && <button onClick={() => deleteComment(it._id) } className='product-btn'>Delete</button>
                                    }
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    );
};

export default ProductPage;