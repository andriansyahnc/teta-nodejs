import dotenv from 'dotenv-safe';
dotenv.config();

import app from './server';
import http from 'http';
import normalizePort from 'normalize-port-2';

import Connector from "./shared/databases/mongoose/Connector";

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const connector = new Connector();
connector.connect().then(() => {
    console.log("connected");
    const server = http.createServer(app);
    const port = app.get('port');
    server.listen(port, () => {
        console.log(`server in: http://localhost:${port}`)
    });
})