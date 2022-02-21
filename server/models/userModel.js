import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const {Schema, model} = mongoose

const newUser = new Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        trim : true
    },
    role : {
        type : String,
        default : 'user'
    }
}, {timestamps : true, versionKey : false})

newUser.pre('save', function (next)  {
    try {
        this.password = bcrypt.hashSync(this.password, 10)
    } catch (e) {
        console.log(e)
    }
    next()
})

newUser.methods.authenticate = function (password) {
    return bcrypt.compareSync(password, this.password)
}

export default model('users', newUser)