const authService = require('../services/authService');

class AuthController {
    async registration(req, res, next) {
       try {
           const { username, email, password } = req.body;
           const user = await authService.registration(username, email, password);
           res.status(200).json(user);
       } catch (e) {
           next(e);
       }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await authService.login(email, password);
            res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new AuthController();
