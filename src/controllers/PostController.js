import { PostService } from "../services/index.js";

export const getAllPosts = PostService.getAllPosts;
export const getOnePost = PostService.getOnePost;
export const createPost = PostService.createPost;
export const removePost = PostService.removePost;
export const updatePost = PostService.updatePost;
export const getLastTags = PostService.getLastTags;
