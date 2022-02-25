import express from "express";
import {payment} from "../controllers/stripeControllers.js";


const router = express.Router()

router.post('/', payment)


export default router