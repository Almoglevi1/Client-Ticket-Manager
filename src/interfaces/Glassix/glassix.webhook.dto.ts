import { TicketMinimal, Transaction, TicketState, EventType } from './Ticket';

export interface Webhook<TChange> {
    key: string;
    dateTime: string;
    changes: TChange[];
}

export interface TicketChangeBase {
    _event: EventType;
    ticketId: number;
}

export interface TicketChange extends TicketChangeBase {
    ticket: TicketMinimal;
}

export interface TicketOwnerChange extends TicketChange {
    ownerId: string;
    ownerUserName: string;
}

export interface TicketStateChange extends TicketChange {
    ticketState: TicketState;
}

export type NewTicket = TicketChange;


export interface NewMessage extends TicketChangeBase {
    transaction: Transaction;
}


