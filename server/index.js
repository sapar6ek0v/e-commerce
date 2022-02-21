import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import passport from 'passport'
import path from "path";

import dbConnect from "./services/mongoose.js";
import userRouter from './routes/authRoutes.js'
import jwtStrategy from "./services/passport.js";
import productRouter from "./routes/productRoutes.js";
import commentRouter from './routes/commentRoutes.js'

dotenv.config()
dbConnect()

const server = express()
const port = process.env.PORT || 8070

server.use(cors())
server.use(express.json())
server.use(cookieParser())
server.use(passport.initialize())
passport.use('jwt', jwtStrategy)

server.use('/api/v1/auth', userRouter)
server.use('/api/v1/products', productRouter)
server.use('/api/v1/comments', commentRouter)

server.use('/static', express.static('images'))

if (process.env.NODE_ENV === 'production') {
    server.use(express.static('client/build'))
    server.get('*', (req, res) => {
        res.sendFile(path.resolve('client/build/index.html'))
    })
}

server.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`)
})
