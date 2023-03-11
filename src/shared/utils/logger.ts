import { removeBackslash, get } from './utility';

const toString = (value: any) => {
    if (Array.isArray(value) && value.length === 0) return '';

    return typeof value === 'string' ? value : removeBackslash(JSON.stringify(value));
};

const date = new Date().toISOString();

export const logError = (err: any) => {
    const message: {
        message?: string,
        request?: any,
        response?: any,
        stack?: any
    } = {};

    message.message = err.message;
    if (get(err, 'response')) {
        message.request = err.config;
        message.response = err.response.data;
        message.stack = err.stack;
    }

    console.error(
        date,
        'ERROR',
        toString(message)
    );
};

export const logInfo = (msg: any, ...optionalParam: any[]) => {
    /* eslint-disable no-console */
    console.log(
        date,
        'INFO',
        toString(msg),
        toString(optionalParam)
    );
    /* eslint-disable no-console */
};
