const formatDate = require("../utils/formatDate");
const { addTags, addNote } = require("../services/glassixServices");

const newTicketController = async (req, res, next) => {
    try {
        // Extract the event data from the request body
        const { key, dateTime, changes } = req.body;

        // Check if the event is a "NEW_TICKET" event
        if (changes && changes[0]._event === "NEW_TICKET") {

            // Store the data into variables
            const ticketId = changes[0].ticketId;
            const ticketOpeningDate = formatDate(changes[0].ticket.open);
            const clientName = changes[0].ticket.participants[0].name;
            const protocolType = changes[0].ticket.participants[0].protocolType;

            // Add tags to the ticket
            await addTags(ticketId);
            console.log("Tags added to the ticket successfully");

            // Prepare the note content
            const noteContent = `Ticket Id: ${ticketId}\nTicket Opening Date: ${ticketOpeningDate}\nClient Name: ${clientName}\nProtocol Type: ${protocolType}`;

            // Add note to the ticket
            await addNote(ticketId, noteContent);
            console.log("Note added to the ticket successfully");

            // Return a response after both operations are completed
            return res.status(200).json({ message: "New ticket event processed successfully" });

        } else {
            console.log("Event is not a new ticket event");
            // Return a response indicating that the event is not a "NEW_TICKET" event
            return res.status(200).json({ message: "Event is not a new ticket event" });
        }
    } catch (error) {
        console.error("Error processing new ticket event:", error.message);
        // Pass the error to the error handler middleware
        next(error);
    }
};

module.exports = newTicketController;
