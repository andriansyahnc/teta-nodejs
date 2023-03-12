import MonsterUsecase from "../usecases";

class MonsterControllers {

    async createMonster(body: any) {
        const usecase = new MonsterUsecase();
        return usecase.execute(body);
    }
}

export default MonsterControllers;