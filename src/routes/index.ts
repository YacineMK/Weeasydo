import { Application } from "express";
import { productroute } from "./products.router";


export const setRoutes = async (app: Application) => {
    app.use("/products", productroute);
};
