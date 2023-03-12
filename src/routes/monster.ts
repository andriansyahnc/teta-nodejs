import express, {NextFunction, Request, Response} from 'express';
import httpStatus from "http-status";
import MonsterController from "../monster/controllers/MonsterController";

const router = express.Router();

router.post('/find', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const controller = new MonsterController();
        const response = await controller.findAllMonster(req.body);
        res.status(httpStatus.OK).send(response);
    } catch (e) {
        next(e);
    }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const controller = new MonsterController();
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