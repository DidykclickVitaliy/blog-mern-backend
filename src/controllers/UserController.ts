import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import UserService from '../services/UserService';
import { SECRET_KEY } from '../config/default';

class UserController {
    public async login(request: Request, response: Response) {
        try {
            const email = request.body.email;
            const user = await UserService.login(email);

            if (!user) {
                return response.status(404).json({
                    message: 'User not found'
                });
            }

            const isValidPass = await bcrypt.compare(request.body.password, user._doc.passwordHash);

            if (!isValidPass) {
                return response.status(400).json({
                    message: 'Incorrect email or password'
                });
            }

            const token = jwt.sign(
                {
                    _id: user._id
                },
                SECRET_KEY,
                {
                    expiresIn: '24h'
                }
            );

            const { passwordHash, ...userData } = user._doc;

            return response.json({
                userData,
                token
            });
        } catch (error) {
            return response.status(500).json({
                message: 'Failed to login'
            });
        }
    }

    public async register(request: Request, response: Response) {
        try {
            const email = request.body.email;
            const existingEmail = await UserService.getExistingEmail(email);

            if (existingEmail) {
                return response.status(409).json({
                    message: 'This email is already registered'
                });
            }

            const password = request.body.password;
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const user = await UserService.register({
                fullName: request.body.fullName,
                email: request.body.email,
                passwordHash: hash,
                avatarUrl: request.body.avatarUrl
            });

            const token = jwt.sign(
                {
                    _id: user._id
                },
                SECRET_KEY,
                {
                    expiresIn: '24h'
                }
            );

            const { passwordHash, ...userData } = user._doc;

            return response.json({
                userData,
                token
            });
        } catch (error) {
            console.log(error);
            return response.json({
                message: 'Failed to register'
            });
        }
    }

    public async getMe(request: Request, response: Response) {
        try {
            const userId = request.body.userId;
            const user = await UserService.getMe(userId);

            if (!user) {
                return response.status(404).json({
                    message: 'User not found.'
                });
            }

            const { passwordHash, ...userData } = user._doc;

            return response.json(userData);
        } catch (error) {
            return response.status(500).json({
                message: 'No access'
            });
        }
    }
}

export default new UserController();
