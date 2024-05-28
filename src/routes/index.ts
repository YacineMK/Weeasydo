import { Application } from "express";
import { productroute } from "./products.router";
import { authRouter } from "./auth.route";


export const setRoutes = async (app: Application) => {
    app.use("/products", productroute);
    app.use("/auth", authRouter)
};
