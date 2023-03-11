import express, {Request, Response} from "express";
import monsterRouter from "./monster";

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

router.use('/monsters', monsterRouter);

export default router;