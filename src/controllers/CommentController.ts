import { Request, Response } from 'express';
import { ICommentModel } from '../models/Comment';
import CommentService from '../services/CommentService';

class CommentController {
    public async createComment(request: Request, response: Response) {
        try {
            const text: string = request.body.text;
            const post: string = request.params.id;
            const user: string = request.body.userId;

            const comment: string[] = await CommentService.createComment({
                text,
                post,
                user
            });

            return response.json({
                message: 'success',
                comment
            });
        } catch (error) {
            console.log(error);

            return response.status(500).json({
                message: 'Failed to add comment'
            });
        }
    }

    public async getLastComments(request: Request, response: Response) {
        try {
            const comments = await CommentService.getLastComments();

            return response.json(comments);
        } catch (error) {
            console.log(error);
            return response.status(500).json({
                message: 'Failed to retrieve a last comments'
            });
        }
    }
}

export default new CommentController();
