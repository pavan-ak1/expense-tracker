const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { isTokenValid } = require('../utils/jwt');

const authenticateUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ 
                msg: 'Authentication invalid' 
            });
        }

        const token = authHeader.split(' ')[1];
        const payload = isTokenValid({ token });
        
        if (!payload) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ 
                msg: 'Authentication invalid' 
            });
        }

        // Attach the user to the request object
        req.user = payload;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(StatusCodes.UNAUTHORIZED).json({ 
            msg: 'Authentication invalid' 
        });
    }
};

module.exports = authenticateUser; 