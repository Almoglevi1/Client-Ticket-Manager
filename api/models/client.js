const mongoose = require('mongoose');
const { ticketSchema } = require('./ticket');

const clientSchema = new mongoose.Schema({
    identifier: { type: String, required: true },
    tickets: [ticketSchema] // Array of tickets
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;