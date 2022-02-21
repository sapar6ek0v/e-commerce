import mongoose from "mongoose"

const {Schema, model} = mongoose


const commentSchema = new Schema({
    text : {
        type : String,
        required : true,
        trim : true
    },
    author : {
        type : Schema.Types.ObjectId,
        ref : "users"
    },
    product : {
        type : Schema.Types.ObjectId,
        ref : "products"
    }
}, {timestamps : true, versionKey : false})

export default model('comments', commentSchema)