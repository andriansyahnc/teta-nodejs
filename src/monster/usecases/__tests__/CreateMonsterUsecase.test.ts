import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import CreateMonsterUsecase from "../CreateMonsterUsecase";

describe("CreateMonsterUsecase", () => {
    let mongoServer: MongoMemoryServer;
    let usecase: CreateMonsterUsecase;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);
        usecase = new CreateMonsterUsecase();
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it("should create a new monster", async () => {
        const monsterData = {
            "name": "Bulbasaur",
            "nickname": "The little Bulba",
            "types": [
                "Grass",
                "Poison"
            ],
            "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
            "description": "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
            "height": "2' 04\"",
            "weight": "15.2 lbs",
            "hp": 30,
            "attack": 30,
            "defense": 30,
            "speed": 30
        };
        const monster = await usecase.execute(monsterData);
        expect(monster).toBeDefined();
        expect(monster).toHaveProperty("name", monsterData.name);
        expect(monster).toHaveProperty("types", monsterData.types);
        expect(monster).toHaveProperty("speed", monsterData.speed);
    });

    it("should throw an error when monster data is invalid", async () => {
        const invalidMonsterData = {
            name: "Bulbasaur",
        };
        await expect(usecase.execute(invalidMonsterData)).rejects.toThrow();
    });

    it("should throw an error when something is happened in the database", async () => {
        const monsterData = {
            "name": "Bulbasaur",
            "nickname": "The little Bulba",
            "types": [
                "Grass",
                "Poison"
            ],
            "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
            "description": "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
            "height": "2' 04\"",
            "weight": "15.2 lbs",
            "hp": 30,
            "attack": 30,
            "defense": 30,
            "speed": 30
        };
        await mongoServer.stop();
        await expect(usecase.execute(monsterData)).rejects.toThrow();
    });
});
