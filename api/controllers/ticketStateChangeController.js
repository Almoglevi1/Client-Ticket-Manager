const formatDate = require("../utils/formatDate");
const { getTicket, scrambleTicket } = require("../services/glassixServices");
const saveClientToDB = require('../services/saveClientToDB');

const ticketStateChangeController = async (req, res, next) => {
    try {
        // Extract the event data from the request body
        const { key, dateTime, changes } = req.body;

        // Check if the event is a "TICKET_STATE_CHANGE" event and the ticket state is "Closed"
        if (changes && changes[0]._event === "TICKET_STATE_CHANGE" && changes[0].ticketState === "Closed") {

            const closedTicketId = changes[0].ticketId;

            // Fetch ticket data
            const ticketData = await getTicket(closedTicketId);

            // Store the data into variables
            const clientData = {
                identifier: ticketData.participants[0].identifier, 
                ticket: {
                    clientName: ticketData.participants[0].name,
                    ticketId: ticketData.id,
                    ticketOpeningDate: formatDate(ticketData.open),
                    protocolType: ticketData.participants[0].protocolType,
                    transactions: ticketData.transactions
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
        console.error("Error processing ticket state change:", error.message);
        // Pass the error to the error handler middleware
        next(error);
    }
};

module.exports = ticketStateChangeController;
