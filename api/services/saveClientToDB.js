const Client = require('../models/client');

// Function to save client data to the database
const saveClientToDB = async (clientData) => {
    try {
        const existingClient = await Client.findOne({ identifier: clientData.identifier });
        if (existingClient) {
            // Add new ticket to the existing client's tickets array
            existingClient.tickets.push(clientData.ticket);
            await existingClient.save();
        } else {
            // Save new client data with the ticket
            const client = new Client({
                identifier: clientData.identifier,
                tickets: [clientData.ticket]
            });
            await client.save();
        }
    } catch (error) {
        throw new Error(`Failed to save client data: ${error.message}`);
    }
};

module.exports = saveClientToDB;