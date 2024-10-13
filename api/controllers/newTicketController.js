import formatDate from "../utils/formatDate";
import { addTagsToTicket, addNoteToTicket } from "../services/glassixServices";

const newTicketController = async (req, res, next) => {
    try {
        // Extract the event data from the request body
        const { changes } = req.body;

        // Check if the event is a "NEW_TICKET" event
        if (changes && changes[0]._event === "NEW_TICKET") {

            // Destructure the necessary properties from the changes array
            const [{ ticketId, ticket: { open, participants } }] = changes;
            const [{ name: clientName, protocolType }] = participants;

            // Add tags to the ticket
            await addTagsToTicket(ticketId);
            console.log("Tags added to the ticket successfully");

            // Prepare the note content
            const noteContent = `Ticket Id: ${ticketId}\nTicket Opening Date: ${formatDate(open)}\nClient Name: ${clientName}\nProtocol Type: ${protocolType}`;

            // Add note to the ticket
            await addNoteToTicket(ticketId, noteContent);
            console.log("Note added to the ticket successfully");

            // Return a response after both operations are completed
            return res.status(200).json({ message: "New ticket event processed successfully" });

        } else {
            console.log("Event is not a new ticket event");
            // Return a response indicating that the event is not a "NEW_TICKET" event
            return res.status(200).json({ message: "Event is not a new ticket event" });
        }
    } catch (error) {
        console.error(`Error processing new ticket event: ${error.message}`);
        // Pass the error to the error handler middleware
        next(error);
    }
};

export default newTicketController;