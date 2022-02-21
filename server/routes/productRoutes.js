import express from "express";
import {addProduct, getProducts, deleteProduct, getProductById} from "../controllers/productControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router()

router.post('/save', authMiddleware(['admin']),  addProduct)
router.delete('/delete/:id', authMiddleware(['admin']), deleteProduct)
router.get('/get', getProducts)
router.get('/:id', getProductById)

export default router