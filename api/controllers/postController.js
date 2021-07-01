const postService = require('../services/postService');

class PostController {
    async create(req, res, next) {
        try {
            const post = await postService.create(req.body);
            res.status(200).json(post);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { userId } = req.body;
            const post = await postService.update(id, userId, req.body);
            res.status(200).json(post);
        } catch (e) {
            next(e);
        }
    }

    async remove(req, res, next) {
        try {
            const { id } = req.params;
            const { userId } = req.body;
            await postService.remove(id, userId);
            res.status(200).json({ success: true });
        } catch (e) {
            next(e);
        }
    }

    async like(req, res, next) {
        try {
            const { id } = req.params;
            const { userId } = req.body;
            await postService.likePost(id, userId);
            res.status(200).json({ success: true });
        } catch (e) {
            next(e);
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const post = await postService.getPostById(id);
            res.status(200).json(post);
        } catch (e) {
            next(e);
        }
    }

    async getTimelinePosts(req, res, next) {
        try {
            const { userId } = req.body;
            const posts = await postService.getTimelinePosts(userId);
            res.status(200).json(posts);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new PostController();
