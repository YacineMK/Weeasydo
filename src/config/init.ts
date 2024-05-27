import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { app } from '../app';

dotenv.config()
const port = parseInt(process.env.PORT || '5000')

export const initServer = async () => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("error in Mongodb url")
        }
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log("Mongodb is connected")
        app.listen(port, () => {
            console.log(`Server is running on port ${port}.`);
        });

    } catch (err) {

    }
}

