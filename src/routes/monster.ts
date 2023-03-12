import express, {NextFunction, Request, Response} from 'express';
import httpStatus from "http-status";
import MonsterControllers from "../monster/controllers";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    res.send('Get All Monster');
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const controller = new MonsterControllers();
        const response = await controller.createMonster(req.body);
        res.status(httpStatus.OK).send(response);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    res.send('Get Monster by ID');
});

router.patch('/:id', async (req: Request, res: Response) => {
    res.send('Update Monster by ID');
});

router.delete('/:id', async (req: Request, res: Response) => {
    res.send('Delete Monster by ID');
});

export default router;