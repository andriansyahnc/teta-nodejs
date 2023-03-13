import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";
import LoginUsecase from "../LoginUsecase";
import AuthRepository from "../../repositories/AuthRepository";
import {generateHash} from "../../../shared/utils/utility";

describe("LoginUsecase", () => {

    let mongoServer: MongoMemoryServer;
    let usecase: LoginUsecase;
    let repository: AuthRepository;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);
        usecase = new LoginUsecase();
        repository = new AuthRepository();

        await repository.createAdmin('andriansyahnc', await generateHash('passcode'));
        await repository.createUser('andriansyah', await generateHash('codepass'));
    })

    test.each([
        ['admin', 'andriansyahnc', 'passcode'],
        ['user', 'andriansyah', 'codepass'],
    ])('succeed - %s', async (label, username, password) => {
        const result = await usecase.execute({
            username, password
        });
        expect(result).toBeDefined();
        expect(result.username).toBe(username);
        expect(result.access_token).toBeDefined();
    })

    test.each([
        ['admin', 'andriansyahnc'],
        ['user', 'andriansyah'],
        ['no name', ''],
    ])('failed - %s', async (label, username) => {
        await expect(usecase.execute({username, password: 'wrongpass'})).rejects.toThrow();
    })

    test('failed because there is some issue in database', async () => {
        await mongoose.disconnect();
        await expect(usecase.execute({username: 'andriansyahnc', password: 'passcode'})).rejects.toThrow();
    })
})