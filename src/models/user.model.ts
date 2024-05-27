import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: [true, "Please enter your user name"]
    },
    userphone: {
        type: String,
        required: [true, "Please enter your user phone"],
        unique: true
    },
    useremail: {
        type: String,
        required: [true, "Please enter your user email"]
    },
})

export const usermodel = mongoose.model("users", userSchema);
