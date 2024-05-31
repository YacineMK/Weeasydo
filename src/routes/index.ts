import { Application } from "express";
import { productroute } from "./products.router";
import { authRouter } from "./auth.route";
import { authMiddleware } from "../middlewares/auth.middleware";


export const setRoutes = async (app: Application) => {
    app.use("/products", authMiddleware, productroute);
    app.use("/auth", authRouter)
};
