import httpStatus from "http-status";
import BaseRepository from "../../shared/repositories/BaseRepository";
import Monster, {FilterMonster, IMonster} from "../../shared/models/mongoose/monsterSchema";
import ErrorHandler from "../../shared/errors/ErrorHandler";

class MonsterRepository extends BaseRepository<IMonster, FilterMonster> {
    async create(data: IMonster): Promise<IMonster> {
        try {
            const monster = await Monster.create(data);
            return monster;
        }
        catch (e) {
            const error = e as Error;
            throw new Error(`Failed to create monster: ${error.message}`)
        }
    }

    async delete(id: number): Promise<IMonster> {
        try {
            const foundMonster = await Monster.findByIdAndDelete(id);
            if (!foundMonster) {
                throw new Error(`not found`)
            }
            return foundMonster;
        } catch (e) {
            const error = e as Error;
            throw new Error(`Failed to delete monster by ID: ${error.message}`);
        }
    }

    async updateBySlug(slug: string, data: Partial<IMonster>): Promise<IMonster> {
        try {
            const foundMonster = await Monster.findOneAndUpdate({ slug }, data);
            if (!foundMonster) {
                throw new ErrorHandler(`not found`, httpStatus.NOT_FOUND)
            }
            return foundMonster;
        } catch (e) {
            const error = e as Error;
            throw new Error(`Failed to update monster by slug: ${error.message}`);
        }
    }

    async findByProperties(data: FilterMonster): Promise<IMonster[]> {
        try {
            const foundMonster = await Monster.find(data);
            return foundMonster;
        } catch (e) {
            const error = e as Error;
            throw new Error(`Failed to find by properties: ${error.message}`);
        }
    }
}

export default MonsterRepository;