import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./src/routes/auth.routes.js";
import postRouter from "./src/routes/post.routes.js";
import fileRouter from "./src/routes/file.routes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/files", fileRouter);

const start = async () => {
  await mongoose
    .connect(
      "mongodb+srv://admin:gVcHeZ2PN62QfxZp@cluster0.vk5pvhd.mongodb.net/blog?retryWrites=true&w=majority"
    )
    .then(() => console.log("DB ok"))
    .catch((err) => console.log("DB error", err));

  app.listen(4444, (err) => {
    if (err) {
      return console.log(err);
    }

    console.log("Server OK");
  });
};

start();
