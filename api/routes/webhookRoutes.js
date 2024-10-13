const express = require('express');
const router = express.Router();
const newTicketController = require('../controllers/newTicketController');
const ticketStateChangeController = require('../controllers/ticketStateChangeController');

router.post('/webhook/new-ticket', newTicketController);
router.post('/webhook/ticket-state-change', ticketStateChangeController);

module.exports= router;