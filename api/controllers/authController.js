const authService = require('../services/authService');

class AuthController {
    async registration(req, res, next) {
       try {
           const { username, email, password } = req.body;
           const authData = await authService.registration(username, email, password);
           res.cookie('refreshToken', authData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
           res.status(200).json(authData);
       } catch (e) {
           next(e);
       }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const authData = await authService.login(email, password);
            res.cookie('refreshToken', authData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            res.status(200).json(authData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            await authService.logout(refreshToken);

            return res.json({ success: true });
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const authData = await authService.refresh(refreshToken);

            res.cookie('refreshToken', authData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.status(200).json(authData);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new AuthController();
