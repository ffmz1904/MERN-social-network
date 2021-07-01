const Router = require('express').Router;
const userController = require('../controllers/userController');
const AuthMiddleware = require('../middleware/authMiddleware');
const router = new Router();

//  update user
router.put('/:id', AuthMiddleware, userController.update);
//  delete user
router.delete('/:id', AuthMiddleware, userController.remove)
//  get user
router.get('/:id', userController.getUser);
//  follow user
router.put('/:id/follow', AuthMiddleware, userController.follow);
//  unfollow
router.put('/:id/unfollow', AuthMiddleware, userController.unfollow);

module.exports = router;
