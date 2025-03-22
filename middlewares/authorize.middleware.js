import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js';

const authorizeUser = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            const error = new Error('No token provided');
            error.statusCode = 401;
            throw error;
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id;
        const user = await User.findById(userId);

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 401;
            throw error;
        }

        req.user = user;
        next();

        
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 401;
        }
        next(error);
    }
};

export default authorizeUser;