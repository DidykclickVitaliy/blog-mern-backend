import UserModel from '../models/User.js';

class UserService {
    public async login(email: string) {
        const user = await UserModel.findOne({ email });
        return user;
    }

    public async register(params: Record<string, string>) {
        const { fullName, email, passwordHash, avatarUrl } = params;

        const doc = new UserModel({
            fullName,
            email,
            passwordHash,
            avatarUrl
        });
        const user = await doc.save();

        return user;
    }

    public async getExistingEmail(email: string) {
        const existingEmail = await UserModel.findOne({
            email
        });

        return existingEmail;
    }

    public async getMe(userId: string) {
        const user = await UserModel.findById(userId);
        return user;
    }
}

export default new UserService();
