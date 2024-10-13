import Client from '../models/client';
import { ITicket } from '../models/ticket';

// Define an interface for the client data
interface IClientData {
    identifier: string;
    ticket: ITicket;
}

// Function to save client data to the database
const saveClientToDB = async (clientData: IClientData): Promise<void> => {
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
        throw new Error(`Failed to save client data: ${(error as Error).message}`);
    }
};

export default saveClientToDB;