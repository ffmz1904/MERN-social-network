const jwt = require('jsonwebtoken');
const ApiError = require('../exception/apiError');
const TokenModel = require('../models/Token');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        return {
            accessToken,
            refreshToken
        };
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const token = await TokenModel.findOne({ userId });

        if (token) {
            token.refreshToken = refreshToken;
            await token.save();
            return token;
        }

        return TokenModel.create({ userId, refreshToken });
    }
}

module.exports = new TokenService();
