import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import MonsterRepository from "../../repositories";
import { IMonster } from "../../../shared/models/mongoose/monsterSchema";
import UpdateBySlugUsecase from "../UpdateBySlugUsecase";

describe("UpdateBySlugUsecase", () => {
    let mongoServer: MongoMemoryServer;
    let usecase: UpdateBySlugUsecase;
    let repository: MonsterRepository;
    let monster1: IMonster;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);

        usecase = new UpdateBySlugUsecase();
        repository = new MonsterRepository();

         monster1 = {
            name: "Pikachu",
            types: ["Electric", "Mice"],
            image: "https://www.pokemon.com/us/pokedex/pikachu",
        };

        await repository.create(monster1);
    })

    beforeEach(async () => {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(mongoServer.getUri())
        }
    })

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it("should update monster accordingly", async () => {
        const result = await usecase.execute('pikachu', { image: "https://www.pokemon.com/us/pokedex/pikachus"});
        expect(result).toBeDefined();
        expect(result.image).toBe('https://www.pokemon.com/us/pokedex/pikachus');
    });

    it("should not update monster", async () => {
        await expect(usecase.execute('pikachu', { image1: "https://www.pokemon.com/us/pokedex/pikachus"} as any)).rejects.toThrow();
    });

    it("should throw an error if there is a database issue", async () => {
        await mongoServer.stop();
        await expect(usecase.execute('pikachu', { image: "https://www.pokemon.com/us/pokedex/pikachus"})).rejects.toThrow();
    });
});
