// import {unlinkSync} from 'fs'
// import path from "path";
import Product from '../models/productModel.js'
import Comment from '../models/commentModel.js'
import deleteImageFromCloud from "../services/cloudinary.js";


export const addProduct = (req, res) => {
    const {title, description, price, image, imageId} = req.body
    // const image = req.file ? `/static/${req.file.filename}` : '/static/no_image.jpg'
    const newProduct = new Product({title, description, price, image, imageId})

    newProduct.save((error, product) => {
        if (error) return res.status(400).json({message: "Error, not add product", error})

        res.json({
            message : "You product added!",
            product
        })
    })

}

export const getProducts = (req, res) => {

    Product.find({}, (error, products) => {
        if (error) res.status(400).json({message: "Products not found in db", error})


        res.json({
            message : "Successful!",
            products
        })
    })
}


export const deleteProduct = (req, res) => {
    const {id} = req.params

    Product.findByIdAndDelete(id, (error, product) => {
        if (error) res.status(400).json({message: " not delete", error})

        console.log(product.imageId)

        // try  {
            // const imageName = product.image.replace('/static/', '')
            // if (imageName !== 'no_image.jpg') unlinkSync(path.resolve(`images/${imageName}`))
        // } catch (e) {
        //     console.log("File not found", e)
        // }

        deleteImageFromCloud(product.imageId)


        Comment.deleteMany({product : product._id}, (error) => {
            if (error) res.status(400).json({message: " not delete comment", error})
            res.json({
                message : "delete Successful!",
                product
            })
        } )
    })

}


export const getProductById = (req, res) => {
    const {id} = req.params

    Product
        .findById(id)
        .populate('comments')
        .populate({
            path : "comments",
            populate : {
                path : "author",
                select : "-password"
            }
        })
        .exec((error, product) => {
            if (error || !product) return res.status(401).json({message:"error", e})

            res.json(product)
        })
}