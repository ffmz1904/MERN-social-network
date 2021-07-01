const Router = require('express').Router;
const authRouter = require('./auth');
const userRouter = require('./users');
const postRouter = require('./posts');

const router = new Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/posts', postRouter);

module.exports = router;
