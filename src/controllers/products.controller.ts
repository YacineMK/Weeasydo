import { Request, Response } from 'express';
import { productmodel } from '../models/product.model';


export const getProduct = async (req: Request, res: Response) => {
    try {
        const Products = await productmodel.find()
        res.json(Products)
    } catch (err) {
        console.log(err)
        res.status(500).send("Server Error");
    }
}

export const getProductbyid = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id
        const Products = await productmodel.findById(productId)
        res.json(Products)
    } catch (err) {
        console.log(err)
        res.status(500).send("Server Error");
    }
}

export const postProduct = async (req: Request, res: Response) => {
    const { productname, productprice, productdescription } = req.body;

    if (productname !== undefined && productprice !== undefined && productdescription !== undefined) {
        try {
            const newProduct = new productmodel({
                productname,
                productprice,
                productdescription
            });
            const savedProduct = await newProduct.save();
            res.status(201).json(savedProduct);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    } else {
        res.status(400).send('Missing required fields');
    }
}

export const deleteProductbyid = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id
        const Products = await productmodel.findByIdAndDelete(productId)
        res.json({
            "message": "Product deleted" ,
        })
    } catch (err) {
        console.log(err)
        res.status(500).send("Server Error");
    }
}