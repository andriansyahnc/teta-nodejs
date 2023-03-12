import httpStatus from "http-status";
import MonsterRepository from "../repositories";
import {IMonster} from "../../shared/models/mongoose/monsterSchema";
import {findMonsterJoiSchema} from "../../validations/monster";
import ErrorHandler from "../../shared/errors/ErrorHandler";

export default class FindAllMonsterUsecase {
    repository: MonsterRepository;

    constructor() {
        this.repository = new MonsterRepository();
    }

    async execute(filter: Partial<IMonster>): Promise<IMonster[]> {
        const { error, value } = findMonsterJoiSchema.validate(filter, {
            abortEarly: false,
        });
        if (error) {
            console.error(error);
            throw new ErrorHandler(error.message, httpStatus.UNPROCESSABLE_ENTITY)
        }
        try {
            if (value.types) {
                value.types = {
                    "$in": value.types
                }
            }
            if (value.name) {
                value.name = {
                    "$regex": `.*${value.types}.*`
                }
            }
            return await this.repository.findByProperties(value);
        } catch (err) {
            const e = err as Error;
            throw new ErrorHandler(e.message, httpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}