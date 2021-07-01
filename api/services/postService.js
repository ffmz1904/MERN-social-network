const ApiError = require('../exception/apiError');
const PostModel = require('../models/Post');

class PostService {
    async create(createData) {
        if (!createData) {
            throw ApiError.missingParams({ createData });
        }

        return PostModel.create({ ...createData });
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
}

module.exports = new PostService();
