import formatDate from "../utils/formatDate.js";
import { getTicket, scrambleTicket } from "../services/glassixServices.js";
import saveClientToDB from '../services/saveClientToDB.js';

const ticketStateChangeController = async (req, res, next) => {
    try {
        // Extract the event data from the request body
        const { changes } = req.body;

        // Check if the event is a "TICKET_STATE_CHANGE" event and the ticket state is "Closed"
        if (changes && changes[0]._event === "TICKET_STATE_CHANGE" && changes[0].ticketState === "Closed") {

          // Fetch ticket data using the ticketId from the changes array
          const ticketData = await getTicket(changes[0].ticketId);

            // Destructure the necessary properties from the ticketData
            const { participants: [{ identifier, name: clientName, protocolType }], id: ticketId, open, transactions } = ticketData;

            // Create client data object
            const clientData = {
                identifier, 
                ticket: {
                    clientName,
                    ticketId,
                    ticketOpeningDate: formatDate(open),
                    protocolType,
                    transactions
                }
            };

            // Save client data to the database
            await saveClientToDB(clientData);
            console.log("Client ticket data saved successfully");

            // Scramble the ticket
            await scrambleTicket(clientData.ticket.ticketId);
            console.log("Ticket scrambled successfully");

            // Return a response after both operations are completed
            return res.status(200).json({ message: "Client ticket data saved and ticket scrambled successfully" });

        } else {
            console.log("Event is not a ticket state change event");
            // Return a response indicating that the event is not a "NEW_TICKET" event
            return res.status(200).json({ message: "Event is not a ticket state change event" });
        }
    } catch (error) {
        console.error(`Error processing ticket state change: ${error.message}`);
        // Pass the error to the error handler middleware
        next(error);
    }
};

export default ticketStateChangeController;