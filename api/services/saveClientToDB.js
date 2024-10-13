import Client from '../models/client';

// Function to save client data to the database
const saveClientToDB = async (clientData) => {
    try {
        const { identifier, ticket } = clientData;
        const existingClient = await Client.findOne({ identifier });
        
        if (existingClient) {
            // Add new ticket to the existing client's tickets array
            existingClient.tickets.push(ticket);
            await existingClient.save();
        } else {
            // Save new client data with the ticket
            const client = new Client({
                identifier,
                tickets: [ticket]
            });
            await client.save();
        }
    } catch (error) {
        throw new Error(`Failed to save client data: ${error.message}`);
    }
};

export default saveClientToDB;