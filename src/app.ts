import './dotenv'
import http from 'http';
import normalizePort from 'normalize-port-2';
import App from './server';

import Connector from "./shared/databases/mongoose/Connector";
import {logInfo} from "./shared/utils/logger";

const port = normalizePort(process.env.PORT || '3000');

const connector = new Connector();
connector.connect().then(async () => {
    const app = new App();
    const appServer = await app.init();
    appServer.set('port', port);

    const server = http.createServer(appServer);
    server.listen(port, () => {
        logInfo(`server in: http://localhost:${port}`)
    });
})