const Router = require('express').Router;
const userController = require('../controllers/userController');
const router = new Router();

//  update user
router.put('/:id', userController.update);
//  delete user
router.delete('/:id', userController.remove)
//  get user
router.get('/:id', userController.getUser);
//  follow user
router.put('/:id/follow', userController.follow);
//  unfollow
router.put('/:id/unfollow', userController.unfollow);

module.exports = router;
