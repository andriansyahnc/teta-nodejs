import express, {Express} from "express";
import mainRouter from "./routes";

const app: Express = express();

app.use('/', mainRouter);

export default app;