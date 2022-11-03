import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "../models/User.js";

export const login = async (request, response) => {
  try {
    const user = await UserModel.findOne({ email: request.body.email });

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
      "secret123",
      {
        expiresIn: "1d",
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
};

export const register = async (request, response) => {
  try {
    const password = request.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      fullName: request.body.fullName,
      email: request.body.email,
      passwordHash: hash,
      avatarUrl: request.body.avatarUrl,
    });

    const user = doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "1d",
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
};

export const getMe = async (request, response) => {
  try {
    const user = await UserModel.findById(request.userId);

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
};
