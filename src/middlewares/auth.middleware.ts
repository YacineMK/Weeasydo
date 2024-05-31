import { Request, Response, NextFunction } from "express";
import { ResponseI } from '../types/Response';
import dotenv from 'dotenv'
import jwt, { JwtPayload } from 'jsonwebtoken';


dotenv.config()
interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        const response: ResponseI = {
            status: 'error',
            message: 'Token missing'
        };

        res.json(response)
    }

    try {
        const decoded: any = jwt.verify(token as string, process.env.SECRET_KEY as string);

        (req as CustomRequest).token = decoded;

        console.log((req as CustomRequest).token = decoded)
        next();
    } catch (err) {
        console.log(err)
    }
}


