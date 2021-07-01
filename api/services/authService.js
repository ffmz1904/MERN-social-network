const bcrypt = require('bcrypt');
const UserModel = require('../models/User');

class AuthService {
    async registration(username, email, password) {

        const hashPass = await bcrypt.hash(password, 5);

        const user = await UserModel.create({
           username,
           email,
           password: hashPass
        });

        return user;
    }
}

module.exports = new AuthService();
