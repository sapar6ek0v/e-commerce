import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'


export const signUp = (req, res) => {

    User.findOne({email : req.body.email}, (error, user) => {

        if (error) return res.status(400).json({message : 'Error', error})
        if (user) return res.status(400).json({message : 'Пользователь с таким именем уже существует!'})

        const newUser = new User({...req.body})

        newUser.save((err, data) => {
            if (error) return res.status(401).json({message : "Ошибка в регистрации", err})

            res.json({
                message : "Вы успешно зарегистрировались",
                user : data
            })
        })
    })
}

export const signIn = (req, res) => {
    const {email, password} = req.body

    User.findOne({email}, (error, user) => {
        if (error) return res.status(401).json('Error', error)
        if (!user) return res.status(401).json('Такого пользователя не существует')

        if (!user.authenticate(password)) return res.status(401).json('Неверный пароль или логин')

        const secret = process.env.SECRET_KEY || 'secret'
        const token = jwt.sign({_id : user._id}, secret, {expiresIn: '1d'})
        res.cookie('token', token, {maxAge : 1000 * 60 * 60 * 24})

        res.json({
            message : `Good! ${user.name} `,
            token,
            user : {
                _id : user._id,
                name : user.name,
                email : user.email,
                role : user.role
            }
        })
    })
}


export const authenticate = (req, res) => {
    const {token} = req.cookies
    if (!token) return res.status(401).json({message : "Пользователь не авторизован!"})

    try {
        const secret = process.env.SECRET_KEY || 'secret'

        const verifiedToken = jwt.verify(token, secret)
        const {_id} = verifiedToken

        User.findById(_id, (error, user) => {
            if (error || !user) return res.status(401).json({message : "Пользователь не авторизован!"})

            res.json({
                message : "Пользователь авторизован",
                token,
                user : {
                    _id : user._id,
                    name : user.name,
                    email : user.email,
                    role : user.role
                }
            })
        })
    } catch (e) {
       return  res.status(401).json(e)
    }
}