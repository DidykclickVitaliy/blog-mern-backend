import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import { SECRET_KEY } from '../config/default';

export default (request: Request, response: Response, next: NextFunction) => {
    const token = (request.headers.authorization || '').replace(/Bearer\s?/, ''); //split(' ')[1]

    if (token) {
        try {
            const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

            request.body.userId = decoded._id;
            next();
        } catch (error) {
            return response.status(401).json({
                message: 'No access!'
            });
        }
    } else {
        return response.status(403).json({
            message: 'No access!'
        });
    }
};
