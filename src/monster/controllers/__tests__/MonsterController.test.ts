import MonsterController from "../MonsterController";
import CreateMonsterUsecase from "../../usecases/CreateMonsterUsecase";
import {FilterMonster} from "../../../shared/models/mongoose/monsterSchema";
import FindAllMonsterUsecase from "../../usecases/FindAllMonsterUsecase";
import FindMonsterBySlugUsecase from "../../usecases/FindMonsterBySlugUsecase";
import UpdateBySlugUsecase from "../../usecases/UpdateBySlugUsecase";
import DeleteBySlugUsecase from "../../usecases/DeleteBySlugUsecase";

describe("MonsterController", () => {
    let controller: MonsterController;

    beforeEach(() => {
        controller = new MonsterController();
    });

    describe("createMonster", () => {
        it("should create a new monster", async () => {
            const monsterData: any = {
                name: "Goblin",
                health: 100,
                attack: 20,
                defense: 10
            };

            const mockExecute = jest
                .spyOn(CreateMonsterUsecase.prototype, "execute")
                .mockResolvedValueOnce(monsterData);

            const result = await controller.createMonster(monsterData);

            expect(result).toEqual(monsterData);
            expect(mockExecute).toHaveBeenCalledWith(monsterData);
        });
    });

    describe("findAllMonster", () => {
        it("should find monsters", async () => {
            const filterData: FilterMonster = {
                name: "Gob",
            };
            const monsterData: any = {
                name: "Goblin",
                health: 100,
                attack: 20,
                defense: 10
            };

            const mockExecute = jest
                .spyOn(FindAllMonsterUsecase.prototype, "execute")
                .mockResolvedValueOnce(monsterData);

            const result = await controller.findMonsters(filterData);

            expect(result).toEqual(monsterData);
            expect(mockExecute).toHaveBeenCalledWith(filterData);
        });
    });

    describe("findMonsterBySlug", () => {
        it("should find monsters", async () => {
            const monsterData: any = {
                name: "Goblin",
                health: 100,
                attack: 20,
                defense: 10,
                slug: "goblin"
            };

            const mockExecute = jest
                .spyOn(FindMonsterBySlugUsecase.prototype, "execute")
                .mockResolvedValueOnce(monsterData);

            const result = await controller.findMonsterBySlug(monsterData.slug);

            expect(result).toEqual(monsterData);
            expect(mockExecute).toHaveBeenCalledWith(monsterData.slug);
        });
    });

    describe("updateMonsterBySlug", () => {
        it("should update monster successfully", async () => {
            const monsterData: any = {
                name: "Goblin",
                health: 100,
                attack: 20,
                defense: 10,
                slug: "goblin"
            };

            const mockExecute = jest
                .spyOn(UpdateBySlugUsecase.prototype, "execute")
                .mockResolvedValueOnce(monsterData);

            const result = await controller.updateMonsterBySlug(monsterData.slug, monsterData);

            expect(result).toEqual(monsterData);
            expect(mockExecute).toHaveBeenCalledWith(monsterData.slug, monsterData);
        });
    });

    describe("deleteMonster", () => {
        it("should delete monster successfully", async () => {
            const monsterData: any = {
                name: "Goblin",
                health: 100,
                attack: 20,
                defense: 10,
                slug: "goblin"
            };

            const mockExecute = jest
                .spyOn(DeleteBySlugUsecase.prototype, "execute")
                .mockResolvedValueOnce(monsterData);

            const result = await controller.deleteMonsterBySlug(monsterData.slug);

            expect(result).toEqual(monsterData);
            expect(mockExecute).toHaveBeenCalledWith(monsterData.slug);
        });
    });
});