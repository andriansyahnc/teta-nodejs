import httpStatus from "http-status";
import MonsterRepository from "../repositories";
import {IMonster} from "../../shared/models/mongoose/monsterSchema";
import ErrorHandler from "../../shared/errors/ErrorHandler";

export default class FindMonsterBySlugUsecase {
    repository: MonsterRepository;

    constructor() {
        this.repository = new MonsterRepository();
    }

    async execute(slug: string): Promise<IMonster> {
        try {
            const monsters = await this.repository.findByProperties({ slug });
            if (monsters.length === 0) {
                throw new ErrorHandler("Monster not found.", httpStatus.NOT_FOUND)
            }
            return monsters[0];
        } catch (e) {
            if (e instanceof ErrorHandler) {
                throw e;
            }
            const error = e as Error;
            throw new ErrorHandler(error.message, httpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}