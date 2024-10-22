import { Client, IClient } from '../models/Client';
import { ITicket } from '../models/Ticket';

export const createClient = async (clientData: IClient): Promise<IClient> => {
    try {
        const client = new Client(clientData);
        return await client.save();
    } catch (error) {
        throw new Error(`Failed to create client: ${(error as Error).message}`);
    }
};

export const readClient = async (identifier: string): Promise<IClient | null> => {
    try {
        return await Client.findOne({ identifier });
    } catch (error) {
        throw new Error(`Failed to read client: ${(error as Error).message}`);
    }
};

export const updateOrCreateClient = async (identifier: string, ticket: ITicket): Promise<IClient | null> => {
    try {
        const update = { $push: { tickets: ticket } };
        const options = { new: true, upsert: true };
        // If no document matches the query criteria (there is no document to update) and upsert property is set to true, a new document will be created
        return await Client.findOneAndUpdate({ identifier }, update, options) as any;
    } catch (error) {
        throw Error(`Failed to create or update client: ${(error as Error).message}`);
    }
};

export const deleteClient = async (identifier: string): Promise<IClient | null> => {
    try {
        return await Client.findOneAndDelete({ identifier });
    } catch (error) {
        throw new Error(`Failed to delete client: ${(error as Error).message}`);
    }
};