import dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";
const app: Express = express();

import morgan from "morgan";
import cors from "cors";

import { errorLogger, errorResponder } from "./src/common/middlewares/errors";

import artworksRoute from "./src/artworks/artworks.route";

app.enable("trust proxy");
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.use(errorLogger);

app.use("/artworks", artworksRoute);

app.use(errorResponder);

export default app;
