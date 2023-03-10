import app from '../src/server';
import http from 'http';
import normalizePort from 'normalize-port-2';

import dotenv from 'dotenv';

dotenv.config();

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`server in: http://localhost:${port}`)
});