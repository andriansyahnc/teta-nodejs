abstract class BaseConnector {
    abstract connect(): Promise<void>;
    abstract close(): Promise<unknown>;
}

export default BaseConnector;