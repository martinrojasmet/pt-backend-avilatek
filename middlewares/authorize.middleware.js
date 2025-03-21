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
            res.status(401).json({
                success: false,
                error: 'No token provided'
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id;
        const user = await User.findById(userId);

        if (!user) {
            res.status(401).json({
                success: false,
                error: 'User not found'
            });
        }

        req.user = user;
        next();

        
    } catch (error) {
        res.status(401).json({
            success: false,
            error: 'Unauthorized',
            message: error.message
        });
    }
};

export default authorizeUser;