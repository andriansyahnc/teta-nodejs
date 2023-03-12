import User, {IUser} from "../../shared/models/mongoose/userSchema";


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
        const user = await User.findOne({});
        if (!user) {
            return true;
        }
        return false;
    }
}