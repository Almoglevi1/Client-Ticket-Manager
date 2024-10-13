import express, { Request, Response, NextFunction } from 'express';
import newTicketController from '../controllers/newTicketController';
import ticketStateChangeController from '../controllers/ticketStateChangeController';

const router = express.Router();

router.post('/webhook/new-ticket', (req: Request, res: Response, next: NextFunction) => {
    newTicketController(req, res, next);
});

router.post('/webhook/ticket-state-change', (req: Request, res: Response, next: NextFunction) => {
    ticketStateChangeController(req, res, next);
});

export default router;