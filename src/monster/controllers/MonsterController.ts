import CreateMonsterUsecase from "../usecases/CreateMonsterUsecase";
import FindAllMonsterUsecase from "../usecases/FindAllMonsterUsecase";

class MonsterController {

    async createMonster(body: any) {
        const usecase = new CreateMonsterUsecase();
        return usecase.execute(body);
    }

    async findMonsters(body: any) {
        const usecase = new FindAllMonsterUsecase();
        return usecase.execute(body);
    }
}

export default MonsterController;