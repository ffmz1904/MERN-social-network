const ApiError = require('../exception/apiError');
const PostModel = require('../models/Post');
const userService = require('./userService');

class PostService {
    async create(userId, createData) {
        if (!userId || !createData) {
            throw ApiError.missingParams({ userId, createData });
        }

        return PostModel.create({ ...createData, userId });
    }

    async update(postId, userId, updateData) {
        if (!postId || !userId) {
            throw ApiError.missingParams({ userId, id: postId });
        }

        const post = await PostModel.findById(postId);

        if (post.userId !== userId) {
            throw ApiError.forbidden();
        }

        return PostModel.findByIdAndUpdate(postId,{ $set: updateData }, { new: true });
    }

    async remove(postId, userId) {
        if (!postId || !userId) {
            throw ApiError.missingParams({ userId, id: postId });
        }

        const post = await PostModel.findById(postId);

        if (post.userId !== userId) {
            throw ApiError.forbidden();
        }

        await post.deleteOne();
    }

    async likePost(postId, userId) {
        if (!postId || !userId) {
            throw ApiError.missingParams({ userId, id: postId });
        }

        const post = await PostModel.findById(postId);

        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } });
        } else {
            await post.updateOne({ $pull: { likes: userId } });
        }
    }

    async getPostById(postId) {
        if (!postId) {
            throw ApiError.missingParams({ id: postId });
        }

        return PostModel.findById(postId);
    }

    async getTimelinePosts(userId) {
        if (!userId) {
            throw ApiError.missingParams({ userId });
        }

        const currentUser = await userService.getUserById(userId);
        const userPosts = await PostModel.find({ userId });
        const friendPosts = await PostModel.find({ userId: { $in: currentUser.followings } });

        return userPosts.concat(...friendPosts);
    }
}

module.exports = new PostService();
