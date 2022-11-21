import express from "express";

import CommentController from "../controllers/CommentController.js";
import PostController from "../controllers/PostController.js";
import { checkAuth, handleValidationErrors } from "../middleware/index.js";
import { postCreateValidation } from "../validations/index.js";

const router = express.Router();

router.get("", PostController.getAllPosts);
router.get("/tags", PostController.getLastTags);
router.get("/comments", CommentController.getLastComments);
router.get("/tags/:tag", PostController.getPostsByTag);
router.get("/:id", PostController.getOnePost);

router.post(
  "",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.createPost
);
router.post(
  "/:id/comments",
  checkAuth,
  handleValidationErrors,
  CommentController.createComment
);

router.patch(
  "/:id",
  checkAuth,
  handleValidationErrors,
  PostController.updatePost
);

router.delete("/:id", checkAuth, PostController.removePost);

export default router;
