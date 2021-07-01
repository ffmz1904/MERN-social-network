const Router = require('express').Router;
const authRouter = require('./auth');
const userRouter = require('./users');

const router = new Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);

module.exports = router;
