import { Request, Response } from 'express';
import { usermodel } from '../models/user.model';
import { ResponseI } from '../types/Response';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { jwtDecode } from "jwt-decode";

dotenv.config()


export const registerController = async (req: Request, res: Response) => {
    const { username, useremail, userphone, userpassword } = req.body;

    if (username && useremail && userphone && userpassword) {
        const existingUser = await usermodel.findOne({ userphone, useremail });
        const hashpass = await bcrypt.hash(userpassword, 10);
        if (!existingUser) {
            try {
                const newUser = new usermodel({
                    username,
                    useremail,
                    userphone,
                    userpassword: hashpass
                });
                const savedUser = await newUser.save();
                const response: ResponseI = {
                    status: 'success',
                    message: 'User registered successfully',
                    data: savedUser
                };
                res.status(200).json(response);
            } catch (err) {
                console.log(err);
                const response: ResponseI = {
                    status: 'error',
                    message: 'An error occurred while registering user'
                };
                res.status(500).json(response);
            }
        } else {
            const response: ResponseI = {
                status: 'error',
                message: 'User with this phone number already exists'
            };
            res.status(400).json(response);
        }
    } else {
        const response: ResponseI = {
            status: 'error',
            message: 'Missing required fields'
        };
        res.status(400).json(response);
    }
};


export const authController = async (req: Request, res: Response) => {
    const { useremail, userphone, userpassword } = req.body;

    if ((useremail || userphone) && userpassword) {
        try {
            const user = await usermodel.findOne({ $or: [{ useremail }, { userphone }] })

            if (!user) {
                const response: ResponseI = {
                    status: 'error',
                    message: 'User not found'
                };
                return res.status(404).json(response);
            }

            const password: string = user?.userpassword as string;
            const passwordvalid = await bcrypt.compare(userpassword, password)

            if (passwordvalid) {

                const token = jwt.sign({ userId: user._id as string }, process.env.SECRET_KEY as string, { expiresIn: process.env.JWT_EXPIRES_IN });

                const response: ResponseI = {
                    status: 'success',
                    message: 'token Generated',
                    data: `Bearer ${token}`,
                };
                res.status(200).json(response)
            }

        } catch (err) {
            console.log(err)

        }
    }
}

export const mecontroller = async (req: Request, res: Response) => {
    const token = req.headers.authorization;

    try {
        if (!token) {
            throw new Error("Authorization token not provided");
        }

        const decodedToken: any = jwtDecode(token as string);
        const userId: string = decodedToken.userId;

        const user = await usermodel.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        const response: ResponseI = {
            status: 'success',
            message: 'Token Decoded',
            data: user
        };

        return res.status(200).json(response);
    } catch (err) {
        console.error(err);
        const response: ResponseI = {
            status: 'error',
            message: 'Invalid Token'
        };
        return res.status(401).json(response);
    }
};