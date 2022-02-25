import Stripe from 'stripe';
import Custom from '../models/customModel.js'

const stripe = new Stripe(process.env.SECRET_API_KEY)


export const payment = (req, res) => {
    const {id, amount, user, products} = req.body

    stripe.paymentIntents.create({
        payment_method : id, amount, description : `Products : ${products}`, confirm : true, currency : "USD"
    }).then(() => {

        const newCustom = new Custom({
            amount, name: user, products
        })

        newCustom.save((error, custom) => {
            if (error) return res.status(400).json({message: "Not added", error})

            res.json({message: "Thank for you paying", custom})
        })


    }).catch(e => {
        res.status(400).json({message: "There is something wrong with paying", e})
    })
}