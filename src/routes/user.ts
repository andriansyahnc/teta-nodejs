import express, {NextFunction, Request, Response} from 'express';
import httpStatus from "http-status";
import UserController from "../auth/controllers/AuthController";

const router = express.Router();

router.post('/sign-up', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const controller = new UserController();
        const response = await controller.signUpUser(req.body);
        res.status(httpStatus.OK).send(response);
    } catch (e) {
        next(e);
    }
});

router.post('/:log-in', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const controller = new UserController();
        const response = await controller.logInUser(req.body);
        res.status(httpStatus.OK).send(response);
    } catch (e) {
        next(e);
    }
});

export default router;