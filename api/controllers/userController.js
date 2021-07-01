const ApiError = require('../exception/apiError');
const userService = require('../services/userService');

class UserController {
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { id: userId, isAdmin } = req.user;

            if (id !== userId && !isAdmin) {
                throw ApiError.forbidden();
            }

            const user = await userService.updateUser(id, req.body);
            res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    }

    async remove(req, res, next) {
        try {
            const { id } = req.params;
            const { id: userId, isAdmin } = req.user;

            if (id !== userId && !isAdmin) {
                throw ApiError.forbidden();
            }

            const user = await userService.removeUser(id);
            res.status(200).json({
                success: true,
                user
            });
        } catch (e) {
            next(e);
        }
    }

    async getUser(req, res, next) {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(id);
            res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    }

    async follow(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            if (id === userId) {
                throw ApiError.forbidden(); //can`t follow yourself!
            }

            await userService.follow(userId, id);
            res.status(200).json({ success: true });
        } catch (e) {
            next(e);
        }
    }

    async unfollow(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            if (id === userId) {
                throw ApiError.forbidden();
            }

            await userService.unfollow(userId, id);
            res.status(200).json({ success: true });
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();
