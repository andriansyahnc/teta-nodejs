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

    async delete(slug: string): Promise<void> {
        try {
            const result = await Monster.findOneAndDelete({slug, isDeleted: false});
            if (!result) {
                throw new ErrorHandler('not found', httpStatus.NOT_FOUND)
            }
        } catch (e) {
            if (e instanceof ErrorHandler) {
                throw new ErrorHandler(`Failed to delete monster by slug: ${e.message}`, e.statusCode);
            }
            const error = e as Error;
            throw new Error(`Failed to delete monster by slug: ${error.message}`);
        }
    }

    async updateBySlug(slug: string, data: Partial<IMonster>): Promise<IMonster> {
        try {
            const foundMonster = await Monster.findOneAndUpdate({ slug, isDeleted: false }, data);
            if (!foundMonster) {
                throw new ErrorHandler(`not found`, httpStatus.NOT_FOUND)
            }
            return foundMonster;
        } catch (e) {
            if (e instanceof ErrorHandler) {
                throw new ErrorHandler(`Failed to update monster by slug: ${e.message}`, e.statusCode);
            }
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