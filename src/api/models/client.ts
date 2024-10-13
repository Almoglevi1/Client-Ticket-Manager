import mongoose, { Document, Schema, Model } from 'mongoose';
import { ticketSchema } from './ticket';

// Define an interface for the Client document
interface IClient extends Document {
    identifier: string;
    tickets: mongoose.Types.DocumentArray<mongoose.Document>;
}

// Define the Client schema
const clientSchema: Schema<IClient> = new Schema({
    identifier: { type: String, required: true },
    tickets: [ticketSchema] // Array of tickets
});

// Create the Client model
const Client: Model<IClient> = mongoose.model<IClient>('Client', clientSchema);

export default Client;