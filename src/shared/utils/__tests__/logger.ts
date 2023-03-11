import { logError, logInfo } from '../logger';

interface MyError extends Error {
    config?: {
        method: string;
        url: string;
        headers?: Record<string, string>;
        [key: string]: any;
    };
    response?: {
        status: number;
        data: any;
        [key: string]: any;
    };
    stack?: string;
}

describe('logError', () => {
    it('logs an error message and stack trace if the error has a response', () => {
        const err = new Error('Request failed') as MyError;
        err.config = {
            method: 'get',
            url: 'https://example.com/api',
            headers: {
                'Accept': 'application/json',
            },
        };
        err.response = {
            status: 404,
            data: {
                message: 'Not Found',
            },
        };
        err.stack = 'Error: Request failed\n    at test.js:42';

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        logError(err);
        expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenCalledWith(expect.any(String), expect.stringContaining('ERROR'), expect.any(String));
        consoleSpy.mockRestore();
    });

    it('logs an error message without a stack trace if the error has no response', () => {
        const err = new Error('Network error');

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        logError(err);
        expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenCalledWith(expect.any(String), expect.stringContaining('ERROR'), expect.any(String));
        consoleSpy.mockRestore();
    });
});

describe('logInfo', () => {
    it('logs a message with optional parameters', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        logInfo('Request succeeded', { method: 'post', url: 'https://example.com/api' }, { status: 200 });
        expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenCalledWith(expect.any(String), expect.stringContaining('INFO'), expect.any(String), expect.any(String));
        consoleSpy.mockRestore();
    });

    it('logs a message without optional parameters', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        logInfo('Starting up');
        expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenCalledWith(expect.any(String), expect.stringContaining('INFO'), expect.any(String), expect.any(String));
        consoleSpy.mockRestore();
    });
});