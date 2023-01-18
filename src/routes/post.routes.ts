import express, { Router } from 'express';

import CommentController from '../controllers/CommentController';
import PostController from '../controllers/PostController';
import { checkAuth, handleValidationErrors } from '../middleware';
import { postCreateValidation } from '../validations';

const router: Router = express.Router();

router.get('', PostController.getAllPosts);
router.get('/tags', PostController.getLastTags);
router.get('/comments', CommentController.getLastComments);
router.get('/tags/:tag', PostController.getPostsByTag);
router.get('/:id', PostController.getOnePost);

router.post('', checkAuth, postCreateValidation, handleValidationErrors, PostController.createPost);
router.post('/:id/comments', checkAuth, handleValidationErrors, CommentController.createComment);

router.patch('/:id', checkAuth, handleValidationErrors, PostController.updatePost);

router.delete('/:id', checkAuth, PostController.removePost);

export = router;
