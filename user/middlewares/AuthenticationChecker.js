const jwt = require('jsonwebtoken');
const { createError } = require('./Error');

exports.VerifyToken = async (req, res, next) => {
    // Extract the token from the cookie header
    const cookieHeader = req.headers.cookie;
    
    if (!cookieHeader) {
        return next(createError(404, "You are not authenticated"));
    }

    // Extract the token from the cookie string
    const cookieParts = cookieHeader.split(';');
    let token;
    cookieParts.forEach(part => {
        const cookie = part.trim().split('=');
        if (cookie[0] === 'mycookie') {
            token = cookie[1];
        }
    });

    if (!token) {
        return next(createError(404, "You are not authenticated"));
    }

    // Verify the token
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return next(createError(403, 'Token is not valid'));
    }
};
