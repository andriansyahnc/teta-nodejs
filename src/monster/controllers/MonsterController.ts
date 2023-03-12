import CreateMonsterUsecase from "../usecases/CreateMonsterUsecase";

class MonsterController {

    async createMonster(body: any) {
        const usecase = new CreateMonsterUsecase();
        return usecase.execute(body);
    }
}

export default MonsterController;