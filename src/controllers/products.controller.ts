import { Request, Response } from 'express';
import { productmodel } from '../models/product.model';
import { ResponseI } from '../types/Response';
import NodeCache from 'node-cache';

const cache = new NodeCache()

export const getProduct = async (req: Request, res: Response) => {
    try {
        const Products = await productmodel.find()

        const response: ResponseI = {
            status: 'success',
            message: "list of all Products",
            data: Products
        };
        res.json(response)
    } catch (err) {
        console.log(err)
        const response: ResponseI = {
            status: 'error',
            message: "Server Error",
        };
        res.status(500).json(response);
    }
}

export const getProductbyid = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id
        const Product = await productmodel.findById(productId)
        const response: ResponseI = {
            status: 'success',
            message: "product with id" + productId,
            data: Product
        };
        res.json(response)
    } catch (err) {
        console.log(err)
        const response: ResponseI = {
            status: 'success',
            message: "Server Error",
        };
        res.status(500).json(response);
    }
}

export const postProduct = async (req: Request, res: Response) => {
    const { productname, productprice, productdescription } = req.body;

    if (productname && productprice && productdescription) {
        try {
            const newProduct = new productmodel({
                productname,
                productprice,
                productdescription
            });

            const savedProduct = await newProduct.save();


            const response: ResponseI = {
                status: 'success',
                message: 'product created successfully',
                data: savedProduct
            };
            res.status(201).json(response);
        } catch (err) {
            console.error(err);
            const response: ResponseI = {
                status: 'success',
                message: 'Server Error',
            };
            res.status(500).json(response);
        }
    } else {
        res.status(400).send('Missing required fields');
    }
}

export const deleteProductbyid = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id
        const Products = await productmodel.findByIdAndDelete(productId)
        const response: ResponseI = {
            status: 'success',
            message: "Product deleted",
        };
        res.json(response)
    } catch (err) {
        console.log(err)
        const response: ResponseI = {
            status: 'success',
            message: "Server Error",
        };
        res.status(500).json(response);
    }
}