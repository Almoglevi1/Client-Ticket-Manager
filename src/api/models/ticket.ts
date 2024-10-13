import mongoose, { Document, Schema, Model } from 'mongoose';

// Define an interface for the Ticket document
interface ITicket extends Document {
    ticketId: string;
    clientName: string;
    ticketOpeningDate: string;
    protocolType: string;
    transactions: mongoose.Schema.Types.Mixed[];
}

// Define the Ticket schema
const ticketSchema: Schema<ITicket> = new Schema({
    ticketId: { type: String, required: true },
    clientName: { type: String, required: true },
    ticketOpeningDate: { type: String, required: true },
    protocolType: { type: String, required: true },
    transactions: { type: [mongoose.Schema.Types.Mixed], required: true }
});

// Create the Ticket model
const Ticket: Model<ITicket> = mongoose.model<ITicket>('Ticket', ticketSchema);

export { ticketSchema, Ticket, ITicket };