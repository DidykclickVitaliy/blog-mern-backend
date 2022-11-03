import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";

import {
  loginValidation,
  postCreateValidation,
  registerValidation,
} from "./src/validations/index.js";
import { checkAuth, handleValidationErrors } from "./src/middleware/index.js";
import {
  createPost,
  getAllPosts,
  getLastTags,
  getOnePost,
  removePost,
  updatePost,
} from "./src/controllers/PostController.js";
import { getMe, login, register } from "./src/controllers/UserController.js";

mongoose
  .connect(
    "mongodb+srv://admin:gVcHeZ2PN62QfxZp@cluster0.vk5pvhd.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

export const app = express();

export const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

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

app.get("/tags", getLastTags);

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

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
