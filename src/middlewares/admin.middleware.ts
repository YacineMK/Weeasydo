import { Request, Response, NextFunction } from "express";
import { ResponseI } from '../types/Response';
import { JwtPayload } from 'jsonwebtoken';
import { usermodel } from "../models/user.model";

interface User {
    _id: string;
    username: string;
    userphone: string;
    useremail: string;
    role: 'user' | 'admin';
    userpassword: string;
}

interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const adminMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.token as string;
        const user: User | null = await usermodel.findById(userId);

        if (!user) {
            const response: ResponseI = {
                status: 'error',
                message: 'User not found'
            };
            return res.status(404).json(response);
        }

        const role: string = user.role;

        if (role === "admin") {
            return next();
        } else {
            const response: ResponseI = {
                status: 'error',
                message: 'User is not an admin'
            };
            return res.status(403).json(response);
        }
    } catch (err) {
        console.log(err);
        const response: ResponseI = {
            status: 'error',
            message: 'An error occurred'
        };
        return res.status(500).json(response);
    }
};
