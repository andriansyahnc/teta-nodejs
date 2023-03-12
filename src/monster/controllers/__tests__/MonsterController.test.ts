import MonsterController from "../MonsterController";
import CreateMonsterUsecase from "../../usecases/CreateMonsterUsecase";
import {FilterMonster} from "../../../shared/models/mongoose/monsterSchema";
import FindAllMonsterUsecase from "../../usecases/FindAllMonsterUsecase";

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

            const result = await controller.findAllMonster(filterData);

            expect(result).toEqual(monsterData);
            expect(mockExecute).toHaveBeenCalledWith(filterData);
        });
    });
});