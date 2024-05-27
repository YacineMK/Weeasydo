import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid';

const productSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4,
        required: true,
        unique: true
    },
    productname: {
        type: String,
        required: [true, "Please enter your product name"]
    },
    productdescription: {
        type: String,
        required: [true, "Please enter your product description"]
    },
    productprice: {
        type: String,
        required: [true, "Please enter your product product price"]
    },
})

export const productmodel = mongoose.model("products", productSchema)