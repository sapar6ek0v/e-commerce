import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {deleteFromCart, getProducts} from "../../redux/actionCreators/productCreators.js";
import './ProductPage.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";


const ProductPage = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [product, setProduct] = useState({})
    const [text, setText] = useState('')
    const {user, isAuth} = useSelector(s => s.auth)

    const deleteComment = (id) => {
        axios.delete(`/api/v1/comments/delete/${id}`)
            .then(({data}) => {
                setProduct({
                    ...product,
                    comments : product.comments.filter(it => it._id !== id)
                })
                console.log(data)
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
                    comments: [...product.comments, {...data.comment, author: {name: user.name, _id : user._id}}]
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
            })
            .catch(e => console.log(e))
    }, [id])


    return (
        <div className='product-bg'>
            <div className='container'>
                <div className='product-page'>
                    <div className='product-card '>
                        <img className='product-img' src={product.image} alt={product.title}/>
                        <div className='product-about'>
                            <div>
                                <h3 className='product-title text-center text-decoration-underline'>{product.title}</h3>
                                <div className='product-subtitle text-center'>{product.description}</div>
                                <div className='product-subtitle text-center'>Price : {product.price}$</div>
                            </div>
                            <div className='product-btns'>
                                {
                                    isAuth
                                    && user?.role === 'admin'
                                    && <button onClick={() => deleteProduct(product._id)}
                                               className='product-btn'>
                                           Delete
                                       </button>
                                }
                            </div>
                        </div>
                    </div>
                    <h3 className='comments-title'>Comments...</h3>
                    <hr className='text-white'/>
                    {
                        isAuth
                        && <div className='mb-3 py-4'>
                            <div className='text-end'>
                                <textarea value={text} onChange={e => setText(e.target.value)} rows="5"
                                          className='product-text' placeholder='For comment...'> </textarea>
                            </div>
                            <div className='text-end'>
                                <button onClick={saveComment} className='product-btn-green'>Add</button>
                            </div>
                        </div>
                    }
                    <div className='py-4'>
                        {
                            product?.comments?.map(it => {
                                return (
                                    <div key={it._id} className='product-comment'>
                                        <div>
                                            <div className='comment-title'>{it.text}</div>
                                            <div className='comment-author'>{it.author?.name}</div>
                                        </div>
                                        {
                                            isAuth && (user.role === 'admin' || user._id === it.author._id) &&
                                            <button onClick={() => deleteComment(it._id)}
                                                    className='product-btn'>
                                                <FontAwesomeIcon icon={faTrash}/>
                                            </button>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductPage;