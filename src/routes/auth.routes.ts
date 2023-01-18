import express, { Router } from 'express';

import { checkAuth, handleValidationErrors } from '../middleware';
import { loginValidation, registerValidation } from '../validations';
import UserController from '../controllers/UserController';

const router: Router = express.Router();

router.get('/me', checkAuth, UserController.getMe);
router.post('/login', loginValidation, handleValidationErrors, UserController.login);
router.post('/register', registerValidation, handleValidationErrors, UserController.register);

export = router;
