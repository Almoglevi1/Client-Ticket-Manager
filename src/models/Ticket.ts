import mongoose, { Document, Schema, Model } from 'mongoose';
import { ProtocolType, Transaction } from '../interfaces/Glassix/Ticket';

// Define an interface for the Ticket document
interface ITicket extends Document {
    ticketId: number;
    clientName: string; 
    ticketOpeningDate: String;
    protocolType: ProtocolType;
    transactions: Transaction[]; 
}

// Define the Transaction schema
const transactionSchema: Schema<Transaction> = new Schema({
    guidTransactionId: { type: String, required: true },
    id: { type: Number, required: true },
    dateTime: { type: Date, required: true },
    fromProtocolType: { type: String, required: true },
    type: { type: String, required: true },
    text: { type: String },
    html: { type: String },
    status: { type: String, required: true },
    fromParticipant: { type: mongoose.Schema.Types.Mixed, required: true },
    attachments: { type: [{ filename: String, buffer: Buffer }] }, // Use the Attachment type
    payload: { type: mongoose.Schema.Types.Mixed }
});

// Define the Ticket schema
const ticketSchema: Schema<ITicket> = new Schema({
    ticketId: { type: Number, required: true }, 
    clientName: { type: String, required: true },
    ticketOpeningDate: { type: String, required: true },
    protocolType: { type: String, required: true, enum: Object.values(ProtocolType) }, // Validate the string is one of the ProtocolType enum
    transactions: { type: [transactionSchema], required: true }
});

// Create the Ticket model
const Ticket: Model<ITicket> = mongoose.model<ITicket>('Ticket', ticketSchema);

export { ticketSchema, Ticket, ITicket };