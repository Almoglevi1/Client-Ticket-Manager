import formatDate from "../utils/formatDate";
import { addTagsToTicket, addNoteToTicket } from "../services/Glassix/glassixServices";
import { Request, Response, NextFunction } from 'express';
import { NewTicket, Webhook } from '../interfaces/Glassix/glassix.webhook.dto';

const newTicketController = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        // Extract the event data from the request body
        const { changes } = req.body as Webhook<NewTicket>;;

        // Destructure the necessary properties from the changes array
        const { ticketId, ticket: { open, participants } } = changes[0];
        const { name: clientName, protocolType } = participants[0];

        // Define the tags to be added
        const tags = ["testing"];
        // Add tags to the ticket
        await addTagsToTicket(ticketId, tags);
        console.log("Tags added to the ticket successfully");

        // Prepare the note content
        const noteContent = {
            text: `Ticket Id: ${ticketId}\nTicket Opening Date: ${formatDate(open ?? new Date())}\nClient Name: ${clientName}\nProtocol Type: ${protocolType}`
        };
        // Add note to the ticket
        await addNoteToTicket(ticketId, noteContent);
        console.log("Note added to the ticket successfully");

        // Return a response after both operations are completed
        return res.status(200).json({ message: "New ticket event processed successfully" });
    } catch (error) {
        console.error(`Error processing new ticket event: ${(error as Error).message}`);
        // Pass the error to the error handler middleware
        next(error);
    }
};

export default newTicketController;