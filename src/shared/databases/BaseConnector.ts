export abstract class BaseConnector {
    abstract init(): Promise<void>;
}

export default BaseConnector;