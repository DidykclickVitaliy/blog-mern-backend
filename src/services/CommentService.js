import CommentModel from "../models/Comment.js";
import PostModel from "../models/Post.js";

class CommentService {
  async createComment(comment) {
    const { text, postId, userId } = comment;

    const doc = new CommentModel({
      text,
      post: postId,
      user: userId,
    });
    const createdComment = await doc.save();

    const postRelated = await PostModel.findById(postId);
    postRelated.comments.push(createdComment);
    const post = await postRelated.save();

    const postComments = post.comments;

    return postComments;
  }

  async getLastComments() {
    const comments = await CommentModel.find()
      .populate("user", "-passwordHash")
      .exec();

    const lastComments = comments.slice(-5);
    return lastComments;
  }
}

export default new CommentService();
