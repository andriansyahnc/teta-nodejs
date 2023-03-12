import {NextFunction, Request, Response} from "express";
import httpStatus from "http-status";
import ErrorHandler from "../errors/ErrorHandler";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    if (err instanceof ErrorHandler) {
        return res.status(err.statusCode).json({
            message: err.message,
        })
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: err.message
    })
    
    next()
}

export default errorHandler;