import express, {NextFunction, Request, Response} from 'express';
import httpStatus from "http-status";
import MonsterController from "../monster/controllers/MonsterController";

const router = express.Router();

router.post('/find', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const controller = new MonsterController();
        const response = await controller.findMonsters(req.body);
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

router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const controller = new MonsterController();
        const { slug } = req.params;
        const response = await controller.findMonsterBySlug(slug);
        res.status(httpStatus.OK).send(response);
    } catch (e) {
        next(e);
    }
});

router.patch('/:slug', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const controller = new MonsterController();
        const { slug } = req.params;
        const response = await controller.updateMonsterBySlug(slug, req.body);
        res.status(httpStatus.OK).send(response);
    } catch (e) {
        next(e);
    }
});

router.delete('/:slug', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const controller = new MonsterController();
        const { slug } = req.params;
        const response = await controller.deleteMonsterBySlug(slug);
        res.status(httpStatus.OK).send(response);
    } catch (e) {
        next(e);
    }
});

export default router;