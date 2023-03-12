import CreateMonsterUsecase from "../usecases/CreateMonsterUsecase";
import FindAllMonsterUsecase from "../usecases/FindAllMonsterUsecase";
import FindMonsterBySlugUsecase from "../usecases/FindMonsterBySlugUsecase";

class MonsterController {

    async createMonster(body: any) {
        const usecase = new CreateMonsterUsecase();
        return usecase.execute(body);
    }

    async findMonsters(body: any) {
        const usecase = new FindAllMonsterUsecase();
        return usecase.execute(body);
    }

    async findMonsterBySlug(slug: string) {
        const usecase = new FindMonsterBySlugUsecase();
        return usecase.execute(slug);
    }
}

export default MonsterController;