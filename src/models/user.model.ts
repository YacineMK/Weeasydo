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
        unique: true,
        required: [true, "Please enter your user name"]
    },
    userphone: {
        type: String,
        required: [true, "Please enter your user phone"],
        unique: true
    },
    useremail: {
        type: String,
        required: [true, "Please enter your user email"],
        unique: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    userpassword: {
        type: String,
        required: [true, "Please enter your password"],
        unique: true
    }
})

export const usermodel = mongoose.model("users", userSchema);
