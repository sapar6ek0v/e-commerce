import express from "express";
import {signUp, signIn, authenticate} from "../controllers/userControllers.js";
// import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router()

router.post('/user/sign_up', signUp )
router.post('/user/sign_in', signIn)
router.get('/user/authenticate', authenticate)
// router.get('/private', authMiddleware(['admin']), (req, res) => {
//     res.send('fdf')
// })


export default router