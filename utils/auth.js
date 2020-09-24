// json related
const jwt = require ('jsonwebtoken');
const { SECRET_KEY, EXPIRATION_DATE } = require ('../config/index');
// modules
const Owner = require('../models/owner');

const newToken = user => {
    const payload = {
        username: user.username,
    };
    return jwt.sign(payload, SECRET_KEY, {
        expiresIn: EXPIRATION_DATE,
    });
};

const verifyToken = token =>
    new Promise((resolve, reject) => {
        jwt.verify(token, SECRET_KEY, (err, payload) => {
            if (err) return reject(err);
            resolve(payload);
        });
    });

// middleware
const authenticateUser = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'token must be included' });
    }

    const token = req.headers.authorization;
    try {
        await verifyToken(token);
    } catch (e) {
        return res.status(401).json({ message: 'token is invalid' });
    }

    next();
};

module.exports = { newToken, authenticateUser, verifyToken };
