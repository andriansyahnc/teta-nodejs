import {NextFunction, Request, Response} from "express";
import jwt from 'jsonwebtoken';
import httpStatus from "http-status";
import config from "../config";
import ErrorHandler from "../errors/ErrorHandler";


const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.header('Authorization') || "";
    const authValues = auth?.split(" ");
    if (!authValues || authValues.length !== 2) {
        next(new ErrorHandler('unauthorized', httpStatus.UNAUTHORIZED));
    }
    const token = authValues[1];

    try {
        const decoded = jwt.verify(token, config.KEY, { algorithms: [ 'HS512' ]});
        res.locals.decoded = decoded;
        next();
    } catch (err) {
        next(new ErrorHandler('unauthorized', httpStatus.UNAUTHORIZED));
    }
}

export default jwtMiddleware;