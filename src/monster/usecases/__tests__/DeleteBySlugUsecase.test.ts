import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import MonsterRepository from "../../repositories";
import MonsterSchema, { IMonster } from "../../../shared/models/mongoose/monsterSchema";
import DeleteBySlugUsecase from "../DeleteBySlugUsecase";

describe("DeleteBySlugUsecase", () => {
    let mongoServer: MongoMemoryServer;
    let usecase: DeleteBySlugUsecase;
    let repository: MonsterRepository;
    let monster1: IMonster;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);

        usecase = new DeleteBySlugUsecase();
        repository = new MonsterRepository();
    })

    beforeEach(async () => {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(mongoServer.getUri())
        }
        if (mongoose.connection.readyState === 1) {
            await MonsterSchema.collection.drop();
        }
    })

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it("should delete monster accordingly", async () => {
        monster1 = {
            name: "Pikachu",
            types: ["Electric", "Mice"],
            image: "https://www.pokemon.com/us/pokedex/pikachu",
        };

        await repository.create(monster1);

        await usecase.execute('pikachu');
        const results = await repository.findByProperties({slug: 'pikachu'});
        expect(results.length).toBeGreaterThan(0);
        expect(results[0].isDeleted).toBe(true);
    });

    it("should not update monster", async () => {
        monster1 = {
            name: "Pikachu",
            types: ["Electric", "Mice"],
            image: "https://www.pokemon.com/us/pokedex/pikachu",
            isDeleted: true
        };

        await repository.create(monster1);

        await expect(usecase.execute('pikachu')).rejects.toThrow();
    });

    it("should throw an error if there is a database issue", async () => {
        monster1 = {
            name: "Pikachu",
            types: ["Electric", "Mice"],
            image: "https://www.pokemon.com/us/pokedex/pikachu",
        };
        await repository.create(monster1);

        await mongoServer.stop();
        await expect(usecase.execute('pikachu')).rejects.toThrow();
    });
});
