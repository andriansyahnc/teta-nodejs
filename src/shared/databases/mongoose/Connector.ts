import BaseConnector from "../BaseConnector";
import * as mongoose from "mongoose";
import config from "../../config";

class Connector extends BaseConnector {

    constructor() {
        super();
    }

    async connect(): Promise<void> {
        const connectionString = `mongodb+srv://${config.DB_USER}:${config.DB_PASS}@${config.DB_NAME}.${config.DB_HOST}/?retryWrites=true&w=majority`;
        try {
            await mongoose.connect(connectionString);
        } catch (e) {
            throw e;
        }
    }

    async close(): Promise<void> {
        return;
    }
}

export default Connector;