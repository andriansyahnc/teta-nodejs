import httpStatus from "http-status";
import User, {IUser} from "../../shared/models/mongoose/userSchema";
import ErrorHandler from "../../shared/errors/ErrorHandler";


export default class AuthRepository {

    async createUser(username: string, hash: string): Promise<IUser> {
        try {
            const user = await User.create({
                name: username,
                password: hash,
                role: 'user',
            });
            return user;
        }
        catch (e) {
            const error = e as Error;
            throw new Error(`Failed to create user: ${error.message}`)
        }

    }

    async createAdmin(username: string, hash: string) {
        try {
            const user = await User.create({
                name: username,
                password: hash,
                role: 'admin',
            });
            return user;
        }
        catch (e) {
            const error = e as Error;
            throw new Error(`Failed to create admin: ${error.message}`)
        }
    }

    async isFirst(): Promise<boolean> {
        try {
            const user = await User.findOne({});
            if (!user) {
                return true;
            }
            return false;
        }
        catch (e) {
            const error = e as Error;
            throw new Error(`Failed to check is first: ${error.message}`)
        }
    }

    async searchUser(name: string): Promise<IUser> {
        try {
            const user = await User.findOne({name});
            if (!user) {
                throw new ErrorHandler('invalid credentials', httpStatus.NOT_FOUND)
            }
            return user;
        }
        catch (e) {
            if (e instanceof ErrorHandler) {
                throw new ErrorHandler(e.message, e.statusCode)
            }
            const error = e as Error;
            throw new Error(`Failed to check search user: ${error.message}`)
        }


    }
}