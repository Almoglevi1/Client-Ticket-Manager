import { ITicket } from '../models/Ticket';
import { updateOrCreateClient } from '../services/clientService';

// Function to save client data to the database
const saveClientToDB = async (identifier: string, ticket: ITicket): Promise<void> => {
    try {
        await updateOrCreateClient(identifier, ticket);
    } catch (error) {
        throw new Error(`Failed to save client data: ${(error as Error).message}`);
    }
};

export default saveClientToDB;