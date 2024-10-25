import { Client, IClient } from '../models/Client';
import { ITicket } from '../models/Ticket';

export const createClient = async (identifier: string, ticket: ITicket): Promise<IClient> => {
    try {
        const client = new Client({ identifier, tickets: [ticket] }); 
        return await client.save();
    } catch (error) {
        throw new Error(`Failed to create client: ${(error as Error).message}`);
    }
};

export const readClient = async (identifier: string): Promise<IClient> => {
    try {
        const client = await Client.findOne({ identifier });
        if (!client) {
            throw new Error(`Client with identifier ${identifier} not found`);
        }
        return client;
    } catch (error) {
        throw new Error(`Failed to read client: ${(error as Error).message}`);
    }
};

export const updateOrCreateClient = async (identifier: string, ticket: ITicket): Promise<IClient> => {
    try {
        const update = { $push: { tickets: ticket } };
        const options = { new: true };
        let client = await Client.findOneAndUpdate({ identifier }, update, options);
        
        if (!client) {
            client = await createClient(identifier, ticket);
        }

        return client;
    } catch (error) {
        throw new Error(`Failed to update or create client: ${(error as Error).message}`);
    }
};

export const deleteClient = async (identifier: string): Promise<IClient> => {
    try {
        const client = await Client.findOneAndDelete({ identifier });
        if (!client) {
            throw new Error(`Failed to delete client: Client with identifier ${identifier} not found`);
        }
        return client;
    } catch (error) {
        throw new Error(`Failed to delete client: ${(error as Error).message}`);
    }
};