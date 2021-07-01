const ApiError = require('../exception/apiError');
const tokenService = require('../services/tokenService');

module.exports = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return next(ApiError.unauthorized());
        }

        const accessToken = authorizationHeader.split(' ')[1];

        if (!accessToken) {
            return next(ApiError.unauthorized());
        }

        const userData = tokenService.validateAccessToken(accessToken);

        if (!userData) {
            return next(ApiError.unauthorized());
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.unauthorized());
    }
};
