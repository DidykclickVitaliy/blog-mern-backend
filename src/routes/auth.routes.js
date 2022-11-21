import express from "express";

import { checkAuth, handleValidationErrors } from "../middleware/index.js";
import { loginValidation, registerValidation } from "../validations/index.js";
import UserController from "../controllers/UserController.js";

const router = express.Router();

router.get("/me", checkAuth, UserController.getMe);
router.post(
  "/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
router.post(
  "/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);

export default router;
