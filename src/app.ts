import express, { Request, Response, Application } from "express";
import { initServer } from "./config/init";
import { setRoutes } from "./routes";
import cors from "cors";

export const app: Application = express();
app.use(cors());
app.use(express.json())

initServer();

setRoutes(app);
