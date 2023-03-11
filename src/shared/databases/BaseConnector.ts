export abstract class BaseConnector {
    abstract connect(): Promise<void>;
    abstract close(): Promise<void>;
}

export default BaseConnector;