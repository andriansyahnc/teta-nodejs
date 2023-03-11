import dotenv from 'dotenv-safe';

import http from 'http';
import normalizePort from 'normalize-port-2';
import app from './server';

import Connector from "./shared/databases/mongoose/Connector";
import {logInfo} from "./shared/utils/logger";

dotenv.config();

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const connector = new Connector();
connector.connect().then(() => {
    const server = http.createServer(app);
    server.listen(port, () => {
        logInfo(`server in: http://localhost:${port}`)
    });
})