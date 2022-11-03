import express from "express";

import { checkAuth, handleValidationErrors } from "../middleware/index.js";
import { loginValidation, registerValidation } from "../validations/index.js";
import { getMe, login, register } from "../controllers/UserController.js";

const router = express.Router();

router.post("/login", loginValidation, handleValidationErrors, login);
router.post("/register", registerValidation, handleValidationErrors, register);
router.get("/me", checkAuth, getMe);

export default router;
