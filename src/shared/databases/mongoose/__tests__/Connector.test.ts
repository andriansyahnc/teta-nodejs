import mongoose from 'mongoose';
import Connector from '../Connector';
import config from '../../../config';

describe('Connector', () => {
    let connector: Connector;

    beforeEach(() => {
        jest.mock('mongoose');

        connector = new Connector();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('connect', () => {
        it('should connect to the database', async () => {
            const expectedConnectionString = `mongodb+srv://${config.DB_USER}:${config.DB_PASS}@${config.DB_NAME}.${config.DB_HOST}/?retryWrites=true&w=majority`;
            mongoose.connect = jest.fn().mockResolvedValueOnce({});

            await connector.connect();

            expect(mongoose.connect).toHaveBeenCalledWith(expectedConnectionString);

            expect(await connector.connect()).toBe(true);
        });

        it('should throw an error if the database fails to connect', async () => {
            mongoose.connect = jest.fn().mockRejectedValue(new Error('Connection failed'));

            await expect(connector.connect()).rejects.toThrow('Database failed to connect: Connection failed');
        });
    });

    describe('close', () => {
        it('should return true', async () => {
            expect(await connector.close()).toBe(true);
        });
    });
});
