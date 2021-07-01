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

    async getUserById(userId) {
        const user = await UserModel.findById(userId);

        if (!user) {
            throw ApiError.notFound(`User wit id ${userId} not found!`);
        }

        const { password, updatedAt, ...publicData } = user._doc;
        return publicData;
    }

    async follow(userId, followToId) {
        if (!userId || !followToId) {
            throw ApiError.missingParams({ userId, id: followToId });
        }

        const currentUser = await UserModel.findById(userId);
        const userFollowTo = await UserModel.findById(followToId);

        if (!currentUser || !userFollowTo) {
            throw ApiError.notFound(`User with id ${currentUser ? followToId : userId} not found!`);
        }

        if (userFollowTo.followers.includes(userId)) {
            throw ApiError.alreadyExists('Already follow!');
        }

        await userFollowTo.updateOne({ $push: { followers: userId } });
        await currentUser.updateOne({ $push: { followings: followToId } });
    }

    async unfollow(userId, unfollowId) {
        if (!userId || !unfollowId) {
            throw ApiError.missingParams({ userId, id: unfollowId });
        }

        const currentUser = await UserModel.findById(userId);
        const unfollowedUser = await UserModel.findById(unfollowId);

        if (!currentUser || !unfollowedUser) {
            throw ApiError.notFound(`User with id ${currentUser ? unfollowId : userId} not found!`);
        }

        if (!unfollowedUser.followers.includes(userId)) {
            throw ApiError.alreadyExists('Already unfollowed!');
        }

        await unfollowedUser.updateOne({ $pull: { followers: userId } });
        await currentUser.updateOne({ $pull: { followings: unfollowId } });
    }
}

module.exports = new UserService();
