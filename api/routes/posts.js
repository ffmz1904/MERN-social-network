const Router = require('express').Router;
const postController = require('../controllers/postController');

const router = new Router();

//  Create post
router.post('/', postController.create);
//  Update post
router.put('/:id', postController.update);
//  Delete post
router.delete('/:id', postController.remove);
//  Like post
//  Get post
//  Get timeline posts

module.exports = router;
