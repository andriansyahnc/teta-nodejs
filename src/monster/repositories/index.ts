import BaseRepository from "../../shared/repositories/BaseRepository";
import Monster, {IMonster} from "../../shared/models/mongoose/monsterSchema";

class MonsterRepository extends BaseRepository<IMonster> {
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

    async find(): Promise<IMonster[]> {
        try {
            const foundMonsters = await Monster.find();
            return foundMonsters;
        } catch (e) {
            const error = e as Error;
            throw new Error(`Failed to find all monsters: ${error.message}`);
        }
    }

    async findById(id: number): Promise<IMonster> {
        try {
            const foundMonster = await Monster.findById(id);
            if (!foundMonster) {
                throw new Error(`Failed to find monster by ID: not found`)
            }
            return foundMonster;
        } catch (e) {
            const error = e as Error;
            throw new Error(`Failed to find monster by ID: ${error.message}`);
        }
    }

    async delete(id: number): Promise<IMonster> {
        try {
            const foundMonster = await Monster.findByIdAndDelete(id);
            if (!foundMonster) {
                throw new Error(`Failed to delete monster by ID: not found`)
            }
            return foundMonster;
        } catch (e) {
            const error = e as Error;
            throw new Error(`Failed to delete monster by ID: ${error.message}`);
        }
    }

    async updateById(id: number, data: Partial<IMonster>): Promise<IMonster> {
        try {
            const foundMonster = await Monster.findByIdAndUpdate(id, data);
            if (!foundMonster) {
                throw new Error(`Failed to update monster by ID: not found`)
            }
            return foundMonster;
        } catch (e) {
            const error = e as Error;
            throw new Error(`Failed to update monster by ID: ${error.message}`);
        }
    }

}

export default MonsterRepository;