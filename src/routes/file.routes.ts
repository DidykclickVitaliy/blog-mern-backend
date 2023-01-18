import express, { Router } from 'express';

import FileService from '../services/FileService';
import FileController from '../controllers/FileController';
import { checkAuth } from '../middleware';

const router: Router = express.Router();

const upload = FileService.createStore();

router.post('/upload', checkAuth, upload.single('image'), FileController.uploadFile);

export = router;
