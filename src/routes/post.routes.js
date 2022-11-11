import express from "express";

import {
  createPost,
  getAllPosts,
  getLastTags,
  getOnePost,
  removePost,
  updatePost,
  getPostsByTag,
} from "../controllers/PostController.js";
import {
  createComment,
  getLastComments,
} from "../controllers/CommentController.js";
import { checkAuth, handleValidationErrors } from "../middleware/index.js";
import { postCreateValidation } from "../validations/index.js";

const router = express.Router();

router.get("", getAllPosts);
router.get("/tags", getLastTags);
router.get("/comments", getLastComments);
router.get("/tags/:tag", getPostsByTag);
router.get("/:id", getOnePost);

router.post(
  "",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  createPost
);
router.post("/:id/comments", checkAuth, handleValidationErrors, createComment);

router.patch("/:id", checkAuth, handleValidationErrors, updatePost);

router.delete("/:id", checkAuth, removePost);

export default router;
