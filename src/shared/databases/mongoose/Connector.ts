import BaseConnector from "../BaseConnector";
import * as mongoose from "mongoose";
import config from "../../config";

class Connector extends BaseConnector {

    constructor() {
        super();
    }

    async init(): Promise<void> {
        await mongoose.connect(`mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`);
    }
}