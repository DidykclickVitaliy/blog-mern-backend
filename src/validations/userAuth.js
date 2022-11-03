import { body } from "express-validator";

export const loginValidation = [
  body("email", "Invalid mail format").isEmail(),
  body("password", "Password must be at least 5 characters long").isLength({
    min: 5,
  }),
];

export const registerValidation = [
  body("email", "Invalid mail format").isEmail(),
  body("password", "Password must be at least 5 characters long").isLength({
    min: 5,
  }),
  body("fullName", "Please enter a name").isLength({ min: 3 }),
  body("avatarUrl", "Invalid avatar link").optional().isURL(),
];
