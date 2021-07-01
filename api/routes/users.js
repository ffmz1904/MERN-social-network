const Router = require('express').Router;
const userController = require('../controllers/userController');
const router = new Router();

//  update user
router.put('/:id', userController.update);
//  delete user
//  get user
//  follow user
//  unfollow

module.exports = router;
