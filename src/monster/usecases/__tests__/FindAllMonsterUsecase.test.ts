import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import MonsterRepository from "../../repositories";
import { IMonster } from "../../../shared/models/mongoose/monsterSchema";
import FindAllMonsterUsecase from "../FindAllMonsterUsecase";

let mongoServer: MongoMemoryServer;
let conn: mongoose.Mongoose;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    conn = await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await conn.disconnect();
    await mongoServer.stop();
});

describe("FindAllMonsterUsecase", () => {
    let usecase: FindAllMonsterUsecase;
    let repository: MonsterRepository;

    beforeEach(() => {
        usecase = new FindAllMonsterUsecase();
        repository = new MonsterRepository();
    });

    afterEach(async () => {
        await conn.connection.db.dropDatabase();
    });

    it("should find all monsters", async () => {
        const monster1: IMonster = {
            name: "Pikachu",
            types: ["Electric", "Mice"],
            image: "https://www.pokemon.com/us/pokedex/pikachu",
        };
        const monster2: IMonster = {
            name: "Charmander",
            types: ["Fire", "Dragon"],
            image: "https://www.pokemon.com/us/pokedex/charmander"
        };

        await repository.create(monster1);
        await repository.create(monster2);

        const filter = {};

        const result = await usecase.execute(filter);

        expect(result.length).toEqual(2);
    });

    it("should find all monsters with matching properties", async () => {
        const monster1: IMonster = {
            name: "Pikachu",
            types: ["Electric", "Mice"],
            image: "https://www.pokemon.com/us/pokedex/pikachu",
        };
        const monster2: IMonster = {
            name: "Charmander",
            types: ["Fire", "Dragon"],
            image: "https://www.pokemon.com/us/pokedex/charmander"
        };

        await repository.create(monster1);
        await repository.create(monster2);

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

    it("should throw an error if the filter is invalid", async () => {
        const filter = {
            invalidProperty: "invalidValue",
        };

        await expect(usecase.execute(filter as any)).rejects.toThrow();
    });
});
