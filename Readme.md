# Testing Instructions for WebSocket Connection Management Project

This document provides instructions on how to set up and run tests for our WebSocket Connection Management project.

## Prerequisites

Before running the tests, ensure you have the following installed:
- Node.js (v14 or later)
- npm (usually comes with Node.js)
- MongoDB
- Redis

## Setup

1. Clone the repository and navigate to the project directory:
   ```
   git clone https://github.com/hritik189/websocket-management.git
   cd websocket-management
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your environment variables by copying the `.env.example` file to `.env` and filling in your specific values:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/websocket_db
   REDIS_URL=redis://localhost:6379
   MAX_CONNECTIONS_PER_CLIENT=5
   MAX_MESSAGES_PER_MINUTE=60
   ```

   Edit the `.env` file with your MongoDB and Redis connection details, and set your desired rate limiting values.

4. Start your MongoDB and Redis instances.

## Running the Server

Start the server in development mode:
```
npm run dev
```

The server should now be running on `http://localhost:3000` (or the port specified in your `.env` file).




## Manual Testing with Postman

### Testing HTTP Endpoints

1. Open Postman and create a new request for each of these endpoints:

   a. Get all active connections:
   - Method: GET
   - URL: http://localhost:3000/api/connections

   b. Get connection statistics:
   - Method: GET
   - URL: http://localhost:3000/api/stats

   c. Get recent messages:
   - Method: GET
   - URL: http://localhost:3000/api/messages

2. Send each request and verify that you receive a JSON response with the expected data.

### Testing WebSocket Connection

1. In Postman, create a new WebSocket request:
   - URL: ws://localhost:3000

2. Click "Connect" to establish the WebSocket connection.

3. Once connected, you can send messages in the following format:
   ```json
   {"content": "Your message here", "priority": 1}
   ```

4. Observe the server's responses in the messages list.

### Testing Specific Features

1. Connection Throttling:
   - Open multiple WebSocket connections in Postman.
   - Verify that you can open up to the maximum number of connections per client (as set in your .env file).
   - Additional connection attempts should be closed by the server.

2. Rate Limiting:
   - In a single WebSocket connection, send messages rapidly.
   - After exceeding the rate limit, you should receive an error message.

3. Message Priority:
   - Send messages with different priorities:
     ```json
     {"content": "High priority message", "priority": 2}
     {"content": "Normal priority message", "priority": 1}
     {"content": "Low priority message", "priority": 0}
     ```
   - Verify that higher priority messages are processed first.

4. Heartbeat:
   - Keep a WebSocket connection open for a while.
   - Verify that you periodically receive heartbeat messages from the server.
   - The frequency of these messages may change based on the number of active connections.



Remember to start your server before running any tests. If you encounter any issues or unexpected behavior, please check the server logs for more information.