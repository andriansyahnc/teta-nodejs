import CreateMonsterUsecase from "../usecases/CreateMonsterUsecase";
import FindAllMonsterUsecase from "../usecases/FindAllMonsterUsecase";
import FindMonsterBySlugUsecase from "../usecases/FindMonsterBySlugUsecase";
import {IMonster} from "../../shared/models/mongoose/monsterSchema";
import UpdateBySlugUsecase from "../usecases/UpdateBySlugUsecase";
import DeleteBySlugUsecase from "../usecases/DeleteBySlugUsecase";

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

    async updateMonsterBySlug(slug: string, data: Partial<IMonster>) {
        const usecase = new UpdateBySlugUsecase();
        return usecase.execute(slug, data)
    }

    async deleteMonsterBySlug(slug: string) {
        const usecase = new DeleteBySlugUsecase();
        return usecase.execute(slug)
    }
}

export default MonsterController;