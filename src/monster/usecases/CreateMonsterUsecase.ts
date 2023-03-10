import httpStatus from "http-status";
import mongoose from "mongoose";
import monsterJoiSchema from "../../validations/monster";
import ErrorHandler from "../../shared/errors/ErrorHandler";
import MonsterRepository from "../repositories";
import {IMonster} from "../../shared/models/mongoose/monsterSchema";

export default class CreateMonsterUsecase {

    repository: MonsterRepository;

    constructor() {
        this.repository = new MonsterRepository();
    }

    async execute(monsterData: any): Promise<IMonster> {
        const { error, value } = monsterJoiSchema.validate(monsterData, {
            abortEarly: false,
        });
        if (error) {
            throw new ErrorHandler(error.message, httpStatus.UNPROCESSABLE_ENTITY)
        }
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const result = await this.repository.create(value);
            await session.commitTransaction();
            return result;
        } catch (e) {
            await session.abortTransaction();
            if (e instanceof ErrorHandler) {
                throw e;
            }
            const err = e as Error;
            throw new ErrorHandler(err.message, httpStatus.INTERNAL_SERVER_ERROR)
        } finally {
            await session.endSession();
        }
    }
}