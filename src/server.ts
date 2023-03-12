import express, {Express, NextFunction, Request, Response} from "express";
import httpStatus from "http-status";
import mainRouter from "./routes";
import errorHandler from "./shared/middlewares/ErrorHandler";

export default class App {
  async init () {
      const app: Express = express();

      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));

      app.use((_, res, next) => {
          const timeout = 60000;
          res.setTimeout(timeout, () => {
              console.error("Request timeout");
              res.status(httpStatus.REQUEST_TIMEOUT).send({
                  success: false,
                  message: "Request timeout",
              });
          });
          next();
      });

      app.use('/', mainRouter);

      app.use((err: Error, req: Request, res: Response, next: NextFunction) => errorHandler(err, req, res, next));

      return app;
  }
}
