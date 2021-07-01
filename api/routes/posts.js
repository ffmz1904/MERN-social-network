const Router = require('express').Router;
const postController = require('../controllers/postController');

const router = new Router();

//  Create post
router.post('/', postController.create);
//  Update post
router.put('/:id', postController.update);
//  Delete post
router.delete('/:id', postController.remove);
//  Like || Dislike post
router.put('/:id/like', postController.like);
//  Get post
router.get('/:id', postController.getOne);
//  Get timeline posts
router.get('/timeline/all', postController.getTimelinePosts);

module.exports = router;
