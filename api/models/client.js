import mongoose from 'mongoose';
import { ticketSchema } from './ticket';

const clientSchema = new mongoose.Schema({
    identifier: { type: String, required: true },
    tickets: [ticketSchema] // Array of tickets
});

const Client = mongoose.model('Client', clientSchema);

export default Client;