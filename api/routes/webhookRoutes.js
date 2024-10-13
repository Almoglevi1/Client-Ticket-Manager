import express from 'express';
import newTicketController from '../controllers/newTicketController';
import ticketStateChangeController from '../controllers/ticketStateChangeController';

const router = express.Router();

router.post('/webhook/new-ticket', newTicketController);
router.post('/webhook/ticket-state-change', ticketStateChangeController);

export default router;