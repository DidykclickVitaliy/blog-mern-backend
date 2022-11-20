import UserModel from "../models/User.js";

class UserService {
  async login(email) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  async register(params) {
    const { fullName, email, passwordHash, avatarUrl } = params;

    const doc = new UserModel({
      fullName,
      email,
      passwordHash,
      avatarUrl,
    });
    const user = await doc.save();

    return user;
  }

  async getExistingEmail(email) {
    const existingEmail = await UserModel.findOne({
      email,
    });

    return existingEmail;
  }

  async getMe(userId) {
    const user = await UserModel.findById(userId);
    return user;
  }
}

export default new UserService();
