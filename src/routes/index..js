import { app } from "../../index.js";
import multer from "multer";

import {
  loginValidation,
  postCreateValidation,
  registerValidation,
} from "../validations/index.js";
import { checkAuth, handleValidationErrors } from "../middleware/index.js";
import { login, getMe, register } from "../controllers/UserController.js";
import {
  createPost,
  getAllPosts,
  getLastTags,
  getOnePost,
  removePost,
  updatePost,
} from "../controllers/PostController";
import { storage } from "../../index.js";

const upload = multer({ storage });

app.post("/auth/login", loginValidation, handleValidationErrors, login);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  register
);
app.get("/auth/me", checkAuth, getMe);

app.post("/upload", checkAuth, upload.single("image"), (request, response) => {
  response.json({
    url: `/uploads/${request.file.originalname}`,
  });
});

app.get("/tags", PostController.getLastTags);

app.get("/posts", getAllPosts);
app.get("/posts/tags", getLastTags);
app.get("/posts/:id", getOnePost);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  createPost
);
app.patch("/posts/:id", checkAuth, handleValidationErrors, updatePost);
app.delete("/posts/:id", checkAuth, removePost);
