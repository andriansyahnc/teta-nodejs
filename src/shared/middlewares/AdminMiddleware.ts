import {NextFunction, Request, Response} from "express";
import httpStatus from "http-status";
import ErrorHandler from "../errors/ErrorHandler";

const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const {decoded} = res.locals;
    if (!decoded.id) {
        next(new ErrorHandler('unauthorized', httpStatus.UNAUTHORIZED));
    } else if (decoded.role !== 'admin') {
            next(new ErrorHandler('unauthorized', httpStatus.UNAUTHORIZED));
        } else {
            next();
        }

}

export default adminMiddleware;