import express, { Request, Response, NextFunction } from 'express';
import eventsController from '../controllers/eventsController';

const router = express.Router();

router.post('/webhook/events', (req: Request, res: Response, next: NextFunction) => {
    eventsController(req, res, next);
});

export default router;