const Router = require('express').Router;
const postController = require('../controllers/postController');
const AuthMiddleware = require('../middleware/authMiddleware');
const router = new Router();

//  Create post
router.post('/', AuthMiddleware, postController.create);
//  Update post
router.put('/:id', AuthMiddleware, postController.update);
//  Delete post
router.delete('/:id', AuthMiddleware, postController.remove);
//  Like || Dislike post
router.put('/:id/like', AuthMiddleware, postController.like);
//  Get post
router.get('/:id', postController.getOne);
//  Get timeline posts
router.get('/timeline/all', AuthMiddleware, postController.getTimelinePosts);

module.exports = router;
