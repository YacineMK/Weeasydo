import { Request, Response } from 'express';
import { usermodel } from '../models/user.model';
import { ResponseI } from '../types/Response';
import bcrypt from 'bcrypt'


export const registerController = async (req: Request, res: Response) => {
    const { username, useremail, userphone, userpassword } = req.body;

    if (username && useremail && userphone && userpassword) {
        const existingUser = await usermodel.findOne({ userphone, useremail });
        const hashpass = bcrypt.hash(userpassword, 10, (err) => {
            console.log(err)
        });
        if (!existingUser) {
            try {
                const newUser = new usermodel({
                    username,
                    useremail,
                    userphone,
                    hashpass
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

    }
}
