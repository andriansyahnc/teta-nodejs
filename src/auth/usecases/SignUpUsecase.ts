import httpStatus from "http-status";
import AuthRepository from "../repositories/AuthRepository";
import authJoiSchema from "../../validations/auth";
import ErrorHandler from "../../shared/errors/ErrorHandler";
import {IUser} from "../../shared/models/mongoose/userSchema";
import {generateHash} from "../../shared/utils/utility";

export default class SignUpUsecase {

    repository: AuthRepository;

    constructor() {
        this.repository = new AuthRepository();
    }

    async execute(body: any): Promise<IUser> {
        const {error, value} = authJoiSchema.validate(body, {abortEarly: false});
        if (error) {
            throw new ErrorHandler(error.message, httpStatus.UNPROCESSABLE_ENTITY);
        }
        const {username, password} = value;
        const hash = await generateHash(password);
        try {
            const isFirst = await this.repository.isFirst();
            if (isFirst) {
                return await this.repository.createAdmin(username, hash);
            }
            return await this.repository.createUser(username, hash);
        } catch (e) {
            const err = e as Error;
            throw new ErrorHandler(err.message, httpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}