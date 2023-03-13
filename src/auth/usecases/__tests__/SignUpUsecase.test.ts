import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";
import AuthRepository from "../../repositories/AuthRepository";
import SignUpUsecase from "../SignUpUsecase";
import User from "../../../shared/models/mongoose/userSchema";

describe("SignUpUsecase", () => {

    let mongoServer: MongoMemoryServer;
    let usecase: SignUpUsecase;
    let repository: AuthRepository;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);
        usecase = new SignUpUsecase();
        repository = new AuthRepository();
    })

    beforeEach(async () => {
        await User.collection.drop();
    })

    test('succeed - admin', async () => {
        const result = await usecase.execute({
            username: 'andriansyah', password: 'passcode'
        });
        expect(result).toBeDefined();
        expect(result.role).toBe('admin');
    })

    test('succeed - user', async () => {
        await repository.createAdmin('ence', 'password');
        const result = await usecase.execute({
            username: 'andriansyah', password: 'passcode'
        });
        expect(result).toBeDefined();
        expect(result.role).toBe('user');
    })

    test('failed because there is some issue in database', async () => {
        await mongoose.disconnect();
        await expect(usecase.execute({username: 'andriansyahnc', password: 'passcode'})).rejects.toThrow();
    })
})