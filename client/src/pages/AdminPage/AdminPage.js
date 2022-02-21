import React, {useState} from 'react';
import './AdminPage.css'
import {useForm} from "react-hook-form";
import axios from "axios";
import {useDispatch} from "react-redux";
import {getProducts} from "../../redux/actionCreators/productCreators.js";
import ModalAlert from "../../components/ModalAlert/ModalAlert.js";


const AdminPage = () => {
    const dispatch = useDispatch()
    const {register, handleSubmit, reset} = useForm()
    const [modalIsOpen, setIsOpen] = useState(false);


    const saveProduct = (data) => {

        const image = new FormData()
        image.append('file', data.image[0])
        image.append('upload_preset', 'ml_default')

        axios.post('https://api.cloudinary.com/v1_1/dzfibdx5d/image/upload', image)
            .then(({data: cloudinary}) => {


                const product = {
                    title: data.title,
                    price: data.price,
                    description: data.description,
                    image: cloudinary.url,
                    imageId : cloudinary.public_id
                }
                axios.post('/api/v1/products/save', product)
                    .then(() => {
                        openModal()
                        dispatch(getProducts())
                        reset()
                    })
                    .catch((e) => alert(e.response?.data?.message || 'error'))
            })
            .catch(e => console.log(e))
    }


    const openModal = () => {
        setIsOpen(true);
    }


    return (
        <div className='form-block'>
            <form onSubmit={handleSubmit(saveProduct)} className="form">
                <div className="title">Welcome</div>
                <div className="subtitle">Let's create your product!</div>
                <div className="input-container ic1">
                    <label htmlFor="title" className='d-inline-block me-3 subtitle'>Title :</label>
                    <input {...register('title', {required: true})} id="title" className="input" type="text"
                           placeholder="Title"/>
                </div>
                <div className="input-container ic2">
                    <label htmlFor="description" className='d-block subtitle'>Description :</label>

                    <textarea {...register('description', {required: true})} name="description" id="description"
                              cols="30" rows="10" className="input" placeholder="Description "> </textarea>
                </div>
                <div className="input-container ic2">
                    <label htmlFor="price" className='d-inline-block me-3 subtitle'>Price :</label>
                    <input {...register('price', {required: true})} id="price" className="input" type="number"
                           placeholder="Price"/>
                </div>
                <div className="input-container ic2 mb-5">
                    <span className='d-inline-block me-3 subtitle'>Image :</span>
                    <label htmlFor="image" className="custom-file-upload">
                        Choose Image
                    </label>
                    <input {...register('image', {required: true})} id="image" type="file" placeholder="Choose File"/>
                </div>
                <button className="submit">Add</button>
            </form>
            <ModalAlert modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} title={'Your product added!'}/>
        </div>
    );
};

export default AdminPage;