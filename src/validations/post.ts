import { body } from 'express-validator';

export const postCreateValidation = [
    body('title', 'Enter the title of the article').isLength({ min: 3 }).isString(),
    body('text', 'Enter article text, minimum 10 characters').isLength({ min: 10 }).isString(),
    body('tags', 'Invalid tag format').optional().isArray(),
    body('imageUrl', 'Invalid image link').optional().isString()
];
