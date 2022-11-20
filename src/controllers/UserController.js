import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { secretKey } from "../config/default.js";
import UserService from "../services/UserService.js";

class UserController {
  async login(request, response) {
    try {
      const email = request.body.email;
      const user = await UserService.login(email);

      if (!user) {
        return response.status(404).json({
          message: "User not found",
        });
      }

      const isValidPass = await bcrypt.compare(
        request.body.password,
        user._doc.passwordHash
      );

      if (!isValidPass) {
        return response.status(400).json({
          message: "Incorrect email or password",
        });
      }

      const token = jwt.sign(
        {
          _id: user._id,
        },
        secretKey,
        {
          expiresIn: "24h",
        }
      );

      const { passwordHash, ...userData } = user._doc;

      return response.json({
        userData,
        token,
      });
    } catch (error) {
      return response.status(500).json({
        message: "Failed to login",
      });
    }
  }

  async register(request, response) {
    try {
      const email = request.body.email;
      const existingEmail = await UserService.getExistingEmail(email);

      console.log(existingEmail);

      if (existingEmail) {
        return response.status(409).json({
          message: "This email is already registered",
        });
      }

      const password = request.body.password;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const user = await UserService.register({
        fullName: request.body.fullName,
        email: request.body.email,
        passwordHash: hash,
        avatarUrl: request.body.avatarUrl,
      });

      const token = jwt.sign(
        {
          _id: user._id,
        },
        secretKey,
        {
          expiresIn: "24h",
        }
      );

      const { passwordHash, ...userData } = user._doc;

      return response.json({
        userData,
        token,
      });
    } catch (error) {
      console.log(error);
      return response.json({
        message: "Failed to register",
      });
    }
  }

  async getMe(request, response) {
    try {
      const userId = request.userId;
      const user = await UserService.getMe(userId);

      if (!user) {
        return response.status(404).json({
          message: "User not found.",
        });
      }

      const { passwordHash, ...userData } = user._doc;

      return response.json(userData);
    } catch (error) {
      return response.status(500).json({
        message: "No access",
      });
    }
  }
}

export default new UserController();
