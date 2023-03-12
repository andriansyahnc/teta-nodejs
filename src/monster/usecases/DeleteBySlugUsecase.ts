import httpStatus from "http-status";
import mongoose from "mongoose";
import MonsterRepository from "../repositories";
import ErrorHandler from "../../shared/errors/ErrorHandler";

export default class DeleteBySlugUsecase {
    repository: MonsterRepository;

    constructor() {
        this.repository = new MonsterRepository();
    }

    async execute(slug: string) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            await this.repository.delete(slug);
            await session.commitTransaction();
        } catch (e) {
            await session.abortTransaction();
            if (e instanceof ErrorHandler) {
                throw new ErrorHandler(e.message, e.statusCode);
            }
            const err = e as Error;
            throw new ErrorHandler(err.message, httpStatus.INTERNAL_SERVER_ERROR)
        } finally {
            await session.endSession();
        }
    }
}