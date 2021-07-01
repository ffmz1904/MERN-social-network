const bcrypt = require('bcrypt');
const ApiError = require('../exception/apiError');
const UserModel = require('../models/User');

class AuthService {
    async registration(username, email, password) {
        if (!username || !email || !password ) {
            throw ApiError.missingParams({ username, email, password });
        }

        const candidate = await UserModel.findOne({ email });

        if (candidate) {
            throw ApiError.badRequest(`User with email ${email} already exists!`);
        }

        const hashPass = await bcrypt.hash(password, 5);

        return UserModel.create({
           username,
           email,
           password: hashPass
        });
    }

    async login(email, password) {
        if (!email || !password) {
            throw ApiError.missingParams({ email, password });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            throw ApiError.badRequest(`Undefined user with email ${email}`);
        }

        const comparePass = await bcrypt.compare(password, user.password);

        if (!comparePass) {
            throw ApiError.badRequest('Bad password!');
        }

        return user;
    }
}

module.exports = new AuthService();
