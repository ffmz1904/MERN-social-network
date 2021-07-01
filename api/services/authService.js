const bcrypt = require('bcrypt');
const ApiError = require('../exception/apiError');
const UserModel = require('../models/User');

class AuthService {
    async registration(username, email, password) {
        if (!username || !email || !password ) {
            throw ApiError.missingParams({ username, email, password });
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
    }
}

module.exports = new AuthService();
