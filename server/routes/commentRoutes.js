import express from "express"
import {saveComment, getComments, deleteComment} from "../controllers/commentControllers.js";

const router = express.Router()

router.post('/save', saveComment)
router.get('/get', getComments )
router.delete('/delete/:id', deleteComment )

export default router