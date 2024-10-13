require("dotenv").config();
const axios = require("axios");
const { getToken } = require('./getToken');

const getTicket = async (ticketId) => {
    try {
        const token = await getToken();
        const getTicketUrl = `https://${process.env.WORKSPACE}.glassix.com/api/v1.2/tickets/get/${ticketId}`;
        const response = await axios.get(getTicketUrl, {
            headers: {
                accept: "application/json",
                authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch ticket data for ticket ID ${ticketId}: ${error.message}`);
    }
};

const addTags = async (ticketId) => {
    try {
        const token = await getToken();
        const addTagsUrl = `https://${process.env.WORKSPACE}.glassix.com/api/v1.2/tickets/addtags/${ticketId}`;
        const tags = ["testing"];
        await axios.post(addTagsUrl, tags, {
            headers: {
                accept: "application/json",
                authorization: `Bearer ${token}`,
                "content-type": "application/json",
            },
        });
    } catch (error) {
        throw new Error(`Failed to add tags to ticket ID ${ticketId}: ${error.message}`);
    }
};

const addNote = async (ticketId, noteContent) => {
    try {
        const token = await getToken();
        const addNoteUrl = `https://${process.env.WORKSPACE}.glassix.com/api/v1.2/tickets/addnote/${ticketId}`;
        await axios.post(addNoteUrl, { text: noteContent }, {
            headers: {
                accept: "application/json",
                authorization: `Bearer ${token}`,
                "content-type": "application/json"
            },
        });
    } catch (error) {
        throw new Error(`Failed to add note to ticket ID ${ticketId}: ${error.message}`);
    }
};

const scrambleTicket = async (ticketId) => {
    try {
        const token = await getToken();
        const scrambleUrl = `https://${process.env.WORKSPACE}.glassix.com/api/v1.2/tickets/scramble/${ticketId}`;
        await axios.delete(scrambleUrl, {
            headers: {
                accept: "application/json",
                authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        throw new Error(`Failed to scramble ticket ID ${ticketId}: ${error.message}`);
    }
};

module.exports = {
    getTicket,
    addTags,
    addNote,
    scrambleTicket
};