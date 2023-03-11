import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    res.send('Get All Monster');
});

router.post('/', async (req: Request, res: Response) => {
    res.send('Create Monster');
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