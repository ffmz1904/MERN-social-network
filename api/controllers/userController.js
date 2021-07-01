const ApiError = require('../exception/apiError');
const userService = require('../services/userService');

class UserController {
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { userId } = req.body;

            if (id !== userId || !req.user.isAdmin) {
                throw ApiError.forbidden();
            }

            const user = await userService.updateUser(id, req.body);
            res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    }

    async f(req, res, next) {
        try {

        } catch (e) {
            next(e);
        }
    }

}

module.exports = new UserController();
