import * as mongoose from "mongoose";
import config from "../../config";
import BaseConnector from "../BaseConnector";

class Connector extends BaseConnector {

    async connect(): Promise<boolean> {
        const connectionString = `mongodb+srv://${config.DB_USER}:${config.DB_PASS}@${config.DB_NAME}.${config.DB_HOST}/?retryWrites=true&w=majority`;
        try {
            await mongoose.connect(connectionString);
            return true;
        } catch (e) {
            const error = e as Error;
            throw new Error(`Database failed to connect: ${error.message}`)
        }
    }

    async close(): Promise<unknown> {
        return true;
    }
}

export default Connector;