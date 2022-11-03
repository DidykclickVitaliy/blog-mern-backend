import express from "express";

import { upload } from "../services/FileService.js";
import { checkAuth } from "../middleware/index.js";

const router = express.Router();

router.post(
  "/upload",
  checkAuth,
  upload.single("image"),
  (request, response) => {
    response.json({
      url: `/uploads/${request.file.originalname}`,
    });
  }
);

export default router;
