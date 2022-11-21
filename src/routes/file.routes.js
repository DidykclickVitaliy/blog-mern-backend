import express from "express";

import { upload } from "../services/FileService.js";
import { checkAuth } from "../middleware/index.js";
import FileController from "../controllers/FileController.js";

const router = express.Router();

router.post(
  "/upload",
  checkAuth,
  upload.single("image"),
  FileController.uploadFile
);

export default router;
