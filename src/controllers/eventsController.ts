import { Request, Response, NextFunction } from 'express';
import { EventType } from '../interfaces/Glassix/Ticket';
import { Webhook, TicketChangeBase } from '../interfaces/Glassix/glassix.webhook.dto';
import newTicketController from './newTicketController';
import ticketStateChangeController from './ticketStateChangeController';

const eventsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { changes } = req.body as Webhook<TicketChangeBase>;

        if (changes.length === 0) {
            res.status(400).json({ message: 'No changes found in the webhook payload' });
            return;
        }

        const eventType = changes[0]._event;

        switch (eventType) {
            case EventType.NEW_TICKET:
                await newTicketController(req, res, next);
                break;
            case EventType.TICKET_STATE_CHANGE:
                await ticketStateChangeController(req, res, next);
                break;
            default:
                res.status(400).json({ message: 'Unknown event type' });
        }
    } catch (error) {
        console.error(`Error processing event: ${(error as Error).message}`);
        next(error);
    }
};

export default eventsController;