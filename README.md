# ClientTicketManager

ClientTicketManager is a TypeScript-based Node.js application designed to manage clients and their associated tickets. <br>It integrates with the Glassix API to handle ticket events and perform various operations on tickets. <br>The project is built using TypeScript, providing type safety and improved code quality. Interfaces and types are defined in the interfaces directory, ensuring consistent data structures throughout the application.
## Features

- Create, read, update, and delete clients and their associated tickets.
- Integration with Glassix API for ticket management and performing various operations on tickets.
- Error handling and logging.
- Environment variable configuration.

## Usage

The application provides a RESTful API to manage clients and tickets. You can use tools like Postman or cURL to interact with the API.

## Project Structure

## Interfacing with Glassix

The application interfaces with the Glassix system to manage ticket events. Glassix is a customer communication platform that allows businesses to manage interactions with their customers. More information about Glassix can be found at [Glassix](https://glassix.co.il/).

### API Integration

The integration with Glassix is handled through the `glassixServices.ts` file located in the `src/services/Glassix` directory. The services provided include:

- **getToken**: Retrieves an authentication token for the Glassix API.
- **getTicket**: Retrieves details of a specific ticket.
- **addTagsToTicket**: Adds tags to a specific ticket.
- **addNoteToTicket**: Adds a note to a specific ticket.
- **scrambleTicket**: Scrambles (deletes) the data of a specific ticket in the Glassix system.

These services are used in various controllers to handle ticket events and update the Glassix system accordingly.

## Handling Ticket Events

Ticket events from Glassix are handled by the `newTicketController.ts` and `ticketStateChangeController.ts` files located in the `src/controllers` directory. <br> The events are sent to our server according to the webhook that listens to them in the Glassix system.

### New Ticket Event

The `newTicketController.ts` handles new ticket events by performing the following steps:

1. Extracts event data from the request body.
2. Destructures necessary properties from the changes array.
3. Adds tags to the ticket using the `addTagsToTicket` service.
4. Prepares and adds a note to the ticket using the `addNoteToTicket` service.
5. Returns a response after both operations are completed.

### Ticket State Change Event

The `ticketStateChangeController.ts` handles ticket state change events by performing the following operations:

1. Extracts the ticket state change event data from the request body.
2. Checks if the ticket is closed.
3. If the ticket is closed, retrieves relevant data from the ticket.
4. Saves the relevant data in the database.
5. Performs a scramble for the ticket, which deletes its data in the Glassix system using the `scrambleTicket` service.
6. Returns a response after the operations are completed.

## Database Documentation

The application uses MongoDB to store client and ticket data. The database connection is configured in the `connectDB.ts` file located in the `src/config` directory.

### Models

#### Client

The `Client` model is defined in the `Client.ts` file located in the `src/models` directory. It includes the following fields:

- `identifier`: A unique identifier for the client.
- `tickets`: An array of tickets associated with the client.

#### Ticket

The `Ticket` model is defined in the `Ticket.ts` file located in the `src/models` directory. It includes the following fields:

- `ticketId`: A unique identifier for the ticket.
- `clientName`: The name of the client associated with the ticket.
- `ticketOpeningDate`: The date the ticket was opened.
- `protocolType`: The protocol type of the ticket.
- `transactions`: An array of transactions associated with the ticket.

### Schemas

The schemas for the models are defined using Mongoose. The `transactionSchema` is used to define the structure of transactions within a ticket.
##
![ClientTicketManager](https://github.com/user-attachments/assets/e1953397-80f5-4318-b7f9-bece6051de53)

