import CommentModel from '../models/Comment';
import PostModel from '../models/Post';

class CommentService {
    public async createComment(comment: Record<string, string>) {
        const { text, post: postId, user } = comment;

        const doc = new CommentModel({
            text,
            postId,
            user
        });
        const createdComment = await doc.save();

        const postRelated = await PostModel.findById(postId);

        postRelated!.comments?.push(createdComment._id);
        const post = await postRelated!.save();

        const postComments = post.comments;

        if (!postComments) {
            return [];
        }

        return postComments;
    }

    public async getLastComments() {
        const comments = await CommentModel.find().populate('user', '-passwordHash').exec();

        const lastComments = comments.slice(-5);
        return lastComments;
    }
}

export default new CommentService();
