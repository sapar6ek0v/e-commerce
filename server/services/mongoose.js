import mongoose from "mongoose";


const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log('db is connecting'))
        .catch(() => console.log('db isn\"t connecting'))
}

export default dbConnect