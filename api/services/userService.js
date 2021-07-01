const bcrypt = require('bcrypt');
const ApiError = require('../exception/apiError');
const UserModel = require('../models/User');

class UserService {
    async updateUser(userId, updateData) {
        if (!userId || !updateData) {
            throw ApiError.missingParams({ userId, updateData });
        }

        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 5);
        }

        return UserModel.findByIdAndUpdate(userId, { $set: updateData }, { new: true });
    }

    async removeUser(userId) {
        if (!userId) {
            throw ApiError.missingParams({ userId });
        }

        return UserModel.findByIdAndDelete(userId);
    }
}

module.exports = new UserService();
