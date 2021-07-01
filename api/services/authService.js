const bcrypt = require('bcrypt');
const ApiError = require('../exception/apiError');
const UserModel = require('../models/User');
const tokenService = require('./tokenService');
const userService = require('./userService');

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

    async logout(token) {
        await tokenService.removeToken(token);
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unauthorized();
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {
            throw ApiError.unauthorized();
        }

        const user = await userService.getUserById(userData.id);
        const tokens = tokenService.generateTokens({
            id: user._id,
            email: user.email,
            isAdmin: user.isAdmin
        });

        const { password, updatedAt, ...publicData } = user._doc;
        await tokenService.saveToken(user._id, tokens.refreshToken);

        return {
            ...tokens,
            user: publicData
        }
    }
}

module.exports = new AuthService();
