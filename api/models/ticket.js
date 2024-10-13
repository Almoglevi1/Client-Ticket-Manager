const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    ticketId: { type: String, required: true },
    clientName: { type: String, required: true },
    ticketOpeningDate: { type: String, required: true },
    protocolType: { type: String, required: true },
    transactions: { type: Array, required: true }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = { ticketSchema, Ticket };