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
            throw new ErrorHandler(error.message, httpStatus.UNPROCESSABLE_ENTITY)
        }
        try {
            if (!value.isDeleted) {
                value.isDeleted = false;
            }
            if (value.types) {
                value.types = {
                    "$in": value.types
                }
            }
            if (value.name) {
                value.name = {
                    "$regex": new RegExp(value.name, "i")
                }
            }
            return await this.repository.findByProperties(value);
        } catch (e) {
            if (e instanceof ErrorHandler) {
                throw e;
            }
            const err = e as Error;
            throw new ErrorHandler(err.message, httpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}