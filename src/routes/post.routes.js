import express from "express";

import {
  createPost,
  getAllPosts,
  getLastTags,
  getOnePost,
  removePost,
  updatePost,
} from "../controllers/PostController.js";
import { checkAuth, handleValidationErrors } from "../middleware/index.js";
import { postCreateValidation } from "../validations/index.js";

const router = express.Router();

router.get("", getAllPosts);
router.get("/tags", getLastTags);
router.get("/:id", getOnePost);
router.post(
  "",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  createPost
);
router.patch("/:id", checkAuth, handleValidationErrors, updatePost);
router.delete("/:id", checkAuth, removePost);

export default router;
