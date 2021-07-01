const bcrypt = require('bcrypt');
const ApiError = require('../exception/apiError');
const UserModel = require('../models/User');
const tokenService = require('./tokenService');

class AuthService {
    async registration(username, email, password) {
        if (!username || !email || !password ) {
            throw ApiError.missingParams({ username, email, password });
        }

        const candidate = await UserModel.findOne({ email });

        if (candidate) {
            throw ApiError.alreadyExists(`User with email ${email} already exists!`);
        }

        const hashPass = await bcrypt.hash(password, 5);

        const user = await UserModel.create({
           username,
           email,
           password: hashPass
        });

        const tokens = tokenService.generateTokens({ id: user._id, email: user.email, isAdmin: user.isAdmin });
        await tokenService.saveToken(user._id, tokens.refreshToken);

        const { password: userPass, updatedAt, ...publicData } = user._doc;

        return {
            ...tokens,
            user: publicData
        }
    }

    async login(email, password) {
        if (!email || !password) {
            throw ApiError.missingParams({ email, password });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            throw ApiError.notFound(`User with email ${email} not found!`);
        }

        const comparePass = await bcrypt.compare(password, user.password);

        if (!comparePass) {
            throw ApiError.badRequest('Bad password!');
        }

        const tokens = tokenService.generateTokens({ id: user._id, email: user.email, isAdmin: user.isAdmin });
        await tokenService.saveToken(user._id, tokens.refreshToken);

        const { password: userPass, updatedAt, ...publicData } = user._doc;

        return {
            ...tokens,
            user: publicData
        }
    }
}

module.exports = new AuthService();
