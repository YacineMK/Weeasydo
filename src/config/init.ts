import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { app } from '../app';

dotenv.config();

const port = parseInt(process.env.PORT || '5000');

export const initServer = async () => {
    console.log("Initializing server...");
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("MongoDB URL is not provided in the environment variables.");
        }
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB is connected");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}.`);
        }
        );
    } catch (err) {
        console.error("Server initialization failed:", err);
    }
};
