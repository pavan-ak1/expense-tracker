const jwt = require('jsonwebtoken');

const creatJwt = ({payload}) => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        if (!process.env.JWT_LIFETIME) {
            throw new Error('JWT_LIFETIME is not defined');
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFETIME
        });
        return token;
    } catch (error) {
        console.error('JWT creation error:', error);
        throw error;
    }
}

const isTokenValid = ({ token }) => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        if (!token) {
            throw new Error('No token provided');
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        return payload;
    } catch (error) {
        console.error('Token validation error:', error);
        return null;
    }
};

const attachCookiesToResponse = ({res, user}) => {
    try {
        const token = creatJwt({payload: user});
        const oneDay = 1000 * 60 * 60 * 24;

        // Set both signed and unsigned cookies for compatibility
        res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + oneDay),
            secure: process.env.NODE_ENV === 'production',
            signed: false,
            sameSite: 'lax',
            path: '/'
        });

        // Also set a non-httpOnly cookie for client-side access
        res.cookie('auth_token', token, {
            expires: new Date(Date.now() + oneDay),
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        });
    } catch (error) {
        console.error('Cookie attachment error:', error);
        throw error;
    }
}

module.exports = {
    creatJwt,
    isTokenValid,
    attachCookiesToResponse
}