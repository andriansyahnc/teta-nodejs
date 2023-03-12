import * as mongoose from "mongoose";
import config from "../../config";
import BaseConnector from "../BaseConnector";
import {logInfo} from "../../utils/logger";

class Connector extends BaseConnector {

    async connect(): Promise<boolean> {
        const pass = encodeURIComponent(config.DB_PASS || "");
        const connectionString = `mongodb+srv://${config.DB_USER}:${pass}@${config.DB_NAME}.${config.DB_HOST}/?retryWrites=true&w=majority`;

        try {
            await mongoose.connect(connectionString);
            logInfo("connected")
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