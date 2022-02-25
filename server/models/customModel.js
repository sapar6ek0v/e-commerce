import mongoose from "mongoose";


const {Schema, model} = mongoose


const newCustoms = new Schema({
    name: String,
    products: String,
    amount: Number,
    idDelivered: {
        type: Boolean,
        default: false
    }
}, {versionKey: false, timestamps: true})

export default model('customers', newCustoms)