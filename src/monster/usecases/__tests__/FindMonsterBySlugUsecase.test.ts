import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import MonsterRepository from "../../repositories";
import { IMonster } from "../../../shared/models/mongoose/monsterSchema";
import FindMonsterBySlugUsecase from "../FindMonsterBySlugUsecase";

describe("FindMonsterBySlugUsecase", () => {
    let mongoServer: MongoMemoryServer;
    let usecase: FindMonsterBySlugUsecase;
    let repository: MonsterRepository;
    let monster1: IMonster;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);

        usecase = new FindMonsterBySlugUsecase();
        repository = new MonsterRepository();

         monster1 = {
            name: "Pikachu",
            types: ["Electric", "Mice"],
            image: "https://www.pokemon.com/us/pokedex/pikachu",
        };

        await repository.create(monster1);
    })

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it("should find monster", async () => {
        const result = await usecase.execute('pikachu');
        expect(result).toBeDefined();
        expect(result.slug).toBe('pikachu');
    });

    it("should not find monster", async () => {
        await expect(usecase.execute('pikachus')).rejects.toThrow();
    });

    it("should throw an error if there is a database issue", async () => {
        await mongoose.disconnect();
        await expect(usecase.execute('pikachu')).rejects.toThrow();
    });
});
