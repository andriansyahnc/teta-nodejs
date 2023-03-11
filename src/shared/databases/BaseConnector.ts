abstract class BaseConnector {
    abstract connect(): Promise<boolean>;
    abstract close(): Promise<unknown>;
}

export default BaseConnector;