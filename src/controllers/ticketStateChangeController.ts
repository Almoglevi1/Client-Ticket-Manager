import { Request, Response, NextFunction } from 'express';
import formatDate from "../utils/formatDate";
import { getTicket, scrambleTicket } from "../services/Glassix/glassixServices";
import saveClientToDB from './saveClientToDB';
import { Ticket as TicketModel } from '../models/Ticket';
import { Ticket, TicketState } from '../interfaces/Glassix/Ticket'; 
import { TicketStateChange, Webhook } from '../interfaces/Glassix/glassix.webhook.dto';

const ticketStateChangeController = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        // Extract the event data from the request body
        const { changes } = req.body as Webhook<TicketStateChange>;

        // Check if the event is a "TICKET_STATE_CHANGE" event and the ticket state is "Closed"
        if (changes && changes[0].ticketState === TicketState.CLOSED) {

            // Fetch ticket data using the ticketId from the changes array
            const ticketData: Ticket = await getTicket(changes[0].ticketId); 

            // Destructure the necessary properties from the ticketData
            const { id: ticketId, open, transactions } = ticketData;
            const { identifier, name: clientName, protocolType } = ticketData.participants[0];

            // Create a new Ticket document
            const ticket = new TicketModel({
                ticketId,
                clientName,
                ticketOpeningDate: formatDate(open ?? new Date()), // if open is null, use the current date
                protocolType,
                transactions
            });

            // Save client data to the database
            await saveClientToDB(identifier, ticket);
            console.log("Client ticket data saved successfully");

            // Scramble the ticket
            await scrambleTicket(ticketId);
            console.log("Ticket scrambled successfully");

            // Return a response after both operations are completed
            return res.status(200).json({ message: "Client ticket data saved and ticket scrambled successfully" });

        } else {
            console.log("Ticket state is not closed");
            // Return a response indicating that the ticket state is not "Closed"
            return res.status(200).json({ message: "Ticket state is not closed" });
        }
    } catch (error) {
        console.error(`Error processing ticket state change: ${(error as Error).message}`);
        // Pass the error to the error handler middleware
        next(error);
    }
};

export default ticketStateChangeController;