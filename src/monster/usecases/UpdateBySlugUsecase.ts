import httpStatus from "http-status";
import mongoose from "mongoose";
import MonsterRepository from "../repositories";
import {IMonster} from "../../shared/models/mongoose/monsterSchema";
import {updateMonsterJoiSchema} from "../../validations/monster";
import ErrorHandler from "../../shared/errors/ErrorHandler";

export default class UpdateBySlugUsecase {
    repository: MonsterRepository;

    constructor() {
        this.repository = new MonsterRepository();
    }

    async execute(slug: string, data: Partial<IMonster>) {
        const { error, value } = updateMonsterJoiSchema.validate(data, {abortEarly: false, allowUnknown: false});

        if (error) {
            throw new ErrorHandler(error.message, httpStatus.UNPROCESSABLE_ENTITY)
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            await this.repository.updateBySlug(slug, value);
            await session.commitTransaction();
            const monsters = await this.repository.findByProperties({ slug })
            return monsters[0];
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