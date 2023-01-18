import { Request, Response } from 'express';
import { Document, Error } from 'mongoose';

import PostService from '../services/PostService.js';
import PostModel from '../models/Post.js';

class PostController {
    public async getAllPosts(request: Request, response: Response) {
        try {
            const posts = await PostService.getAllPosts();

            return response.json(posts);
        } catch (error) {
            console.log(error);
            return response.status(500).json({
                message: 'Failed to get articles'
            });
        }
    }

    public async getOnePost(request: Request, response: Response) {
        try {
            const postId = request.params.id;

            PostModel.findOneAndUpdate(
                {
                    _id: postId
                },
                {
                    $inc: { viewsCount: 1 }
                },
                {
                    returnDocument: 'after'
                },
                (err, doc) => {
                    if (err) {
                        console.log(err);
                        return response.status(500).json({
                            message: 'Failed to retrieve article'
                        });
                    }

                    if (!doc) {
                        return response.status(404).json({
                            message: 'Failed to find article'
                        });
                    }

                    return response.json(doc);
                }
            )
                .populate('user', '-passwordHash')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'user',
                        select: '-passwordHash'
                    }
                });
        } catch (error) {
            console.log(error);
            return response.status(500).json({
                message: 'Failed to get article'
            });
        }
    }

    public async createPost(request: Request, response: Response) {
        try {
            const post = await PostService.createPost({
                title: request.body.title,
                text: request.body.text,
                tags: request.body.tags,
                imageUrl: request.body.imageUrl,
                user: request.body.userId
            });

            return response.json(post);
        } catch (error) {
            console.log(error);
            return response.status(500).json({
                message: 'Failed to create article'
            });
        }
    }

    public async removePost(request: Request, response: Response) {
        try {
            const postId = request.params.id;

            PostModel.findOneAndDelete(
                {
                    _id: postId
                },
                (err: Error, doc: Document) => {
                    if (err) {
                        return response.status(500).json({
                            message: 'Failed to delete article'
                        });
                    }

                    if (!doc) {
                        return response.status(404).json({
                            message: 'Failed to find article'
                        });
                    }

                    return response.json({
                        success: true,
                        postId
                    });
                }
            );
        } catch (error) {
            console.log(error);
            return response.status(500).json({
                message: 'Cannot remove article'
            });
        }
    }

    public async updatePost(request: Request, response: Response) {
        try {
            const id = request.params.id;
            const post = await PostService.updatePost({
                id,
                title: request.body.title,
                text: request.body.text,
                imageUrl: request.body.imageUrl,
                user: request.body.userId,
                tags: request.body.tags
            });

            return response.json({
                success: true,
                post
            });
        } catch (error) {
            console.log(error);
            return response.status(500).json({
                message: 'Failed to update article'
            });
        }
    }

    public async getLastTags(request: Request, response: Response) {
        try {
            const tags = await PostService.getLastTags();

            return response.json(tags);
        } catch (error) {
            console.log(error);
            return response.status(500).json({
                message: 'Failed to get tags'
            });
        }
    }

    public async getPostsByTag(request: Request, response: Response) {
        try {
            const tag = request.params.tag;
            const posts = await PostService.getPostsByTag(tag);

            return response.json(posts);
        } catch (error) {
            console.log(error);
            return response.status(500).json({
                message: 'Failed to get posts by tags'
            });
        }
    }
}

export default new PostController();
