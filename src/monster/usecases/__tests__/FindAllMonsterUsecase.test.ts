import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import MonsterRepository from "../../repositories";
import { IMonster } from "../../../shared/models/mongoose/monsterSchema";
import FindAllMonsterUsecase from "../FindAllMonsterUsecase";

describe("FindAllMonsterUsecase", () => {
    let mongoServer: MongoMemoryServer;
    let usecase: FindAllMonsterUsecase;
    let repository: MonsterRepository;
    let monster1: IMonster;
    let monster2: IMonster;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);

        usecase = new FindAllMonsterUsecase();
        repository = new MonsterRepository();

         monster1 = {
            name: "Pikachu",
            types: ["Electric", "Mice"],
            image: "https://www.pokemon.com/us/pokedex/pikachu",
        };
        monster2 = {
            name: "Charmander",
            types: ["Fire", "Dragon"],
            image: "https://www.pokemon.com/us/pokedex/charmander"
        };

        await repository.create(monster1);
        await repository.create(monster2);
    })

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it("should find all monsters", async () => {
        const filter = {};

        const result = await usecase.execute(filter);

        expect(result.length).toEqual(2);
    });

    it("should find all monsters with matching properties", async () => {
        const filter = {
            name: "Pikachu",
        };

        const result = await usecase.execute(filter);

        expect(result.length).toEqual(1);
        expect(result[0].name).toEqual(monster1.name);
        expect(result[0].types).toEqual(monster1.types);

        const filter1 = {
            types: ["Fire"],
        };

        const result1 = await usecase.execute(filter1);
        expect(result1.length).toEqual(1);
        expect(result1[0].name).toEqual(monster2.name);
        expect(result1[0].types).toEqual(monster2.types);
    });

    it("should find no match with unmatching properties", async () => {
        const filter = {
            name: "Bulbasaur",
        };

        const result = await usecase.execute(filter);

        expect(result.length).toEqual(0);
    });

    it("should throw an error if the filter is invalid", async () => {
        const filter = {
            invalidProperty: "invalidValue",
        };

        await expect(usecase.execute(filter as any)).rejects.toThrow();
    });

    it("should throw an error if there is a database issue", async () => {
        const filter = {
            name: "Pikachu",
        };

        await mongoose.disconnect();
        await expect(usecase.execute(filter as any)).rejects.toThrow();
    });
});
