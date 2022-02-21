import Comment from '../models/commentModel.js'
import Product from '../models/productModel.js'

export const saveComment = (req, res) => {

    const newComment = new Comment({...req.body})

    newComment.save(async (error, comment) => {
        if (error) return res.status(400).json({message:"comment nod add", error})

        try {
            await Product.findByIdAndUpdate(comment.product, { $push : { comments : comment._id}})

            res.json({
                massage : "Comment added!",
                comment
            })
        } catch (e) {
            return res.status(400).json({message:"comment nod add", error})
        }

    })

}

export const getComments = (req, res) => {

    Comment
        .find()
        .populate({
            path : 'author',
            select : '-password'
        })
        .exec((error, comments) => {
            if (error) return res.status(400).json({message:"comments nod found", error})

            res.json(comments)
        })
}

export const deleteComment = (req, res) => {
    const {id} = req.params

    Comment.findByIdAndDelete(id, async (error, comment) => {
        if (error) return res.status(400).json({message:"comments nod delete", error})


        try {
            await Product.findByIdAndUpdate(comment.product, {$pull :{ comments : comment._id} })

            res.json({
                message : "deleted",
                comment
            })
        } catch (e) {
            return res.status(400).json({message:"comments nod delete", e})
        }

    })
}