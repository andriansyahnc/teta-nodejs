class ErrorHandler extends Error {
    statusCode: number;

    details: unknown;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export default ErrorHandler;