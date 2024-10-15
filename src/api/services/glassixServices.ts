import axios from 'axios';
import { getToken } from './getToken';

const getTicket = async (ticketId: string): Promise<any> => {
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
        throw new Error(`Failed to fetch ticket data for ticket ID ${ticketId}: ${(error as Error).message}`);
    }
};

const addTagsToTicket = async (ticketId: string): Promise<void> => {
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
        throw new Error(`Failed to add tags to ticket ID ${ticketId}: ${(error as Error).message}`);
    }
};

const addNoteToTicket = async (ticketId: string, noteContent: string): Promise<void> => {
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
        throw new Error(`Failed to add note to ticket ID ${ticketId}: ${(error as Error).message}`);
    }
};

const scrambleTicket = async (ticketId: string): Promise<void> => {
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
        throw new Error(`Failed to scramble ticket ID ${ticketId}: ${(error as Error).message}`);
    }
};

export {
    getTicket,
    addTagsToTicket,
    addNoteToTicket,
    scrambleTicket
};