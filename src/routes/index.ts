import express, {Request, Response} from "express";
import monsterRouter from "./monster";
import userRouter from "./user";

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

router.use('/monsters', monsterRouter);
router.use('/users', userRouter);

export default router;