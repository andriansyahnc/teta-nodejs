import httpStatus from "http-status";
import argon2 from "argon2";
import jwt from 'jsonwebtoken';
import AuthRepository from "../repositories/AuthRepository";
import authJoiSchema from "../../validations/auth";
import ErrorHandler from "../../shared/errors/ErrorHandler";
import config from "../../shared/config";

export default class LoginUsecase {

    repository: AuthRepository;

    constructor() {
        this.repository = new AuthRepository();
    }

    async execute(body: any) {
        const {error, value} = authJoiSchema.validate(body, {abortEarly: false});
        if (error) {
            throw new ErrorHandler(error.message, httpStatus.UNPROCESSABLE_ENTITY);
        }
        try {
            const {username, password} = value;
            const user = await this.repository.searchUser(username);
            const isPasswordVerified = await argon2.verify(user.password, password);
            if (!isPasswordVerified) {
                throw new ErrorHandler("invalid credentials", httpStatus.NOT_FOUND)
            }

            return {
                username: user.name,
                access_token: jwt.sign({
                    id: user._id,
                    name: user.name,
                    role: user.role,
                }, config.KEY, { algorithm: 'HS512', expiresIn: 6000 })
            }
        } catch (e) {
            if (e instanceof ErrorHandler) {
                throw new ErrorHandler(e.message, e.statusCode)
            }
            const err = e as Error;
            throw new Error(`Failed to login: ${err.message}`)
        }

    }
}