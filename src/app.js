import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import postRouter from "./routes/post.routes.js";
import fileRouter from "./routes/file.routes.js";
import { dbUrl, serverPort } from "./config/default.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/files", fileRouter);

const start = async () => {
  await mongoose
    .connect(dbUrl)
    .then(() => console.log("DB ok"))
    .catch((err) => console.log("DB error", err));

  app.listen(serverPort, (err) => {
    if (err) {
      return console.log(err);
    }

    console.log("Server OK");
  });
};

start();
