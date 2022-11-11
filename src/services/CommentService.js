import CommentModel from "../models/Comment.js";
import PostModel from "../models/Post.js";

export const createComment = async (request, response) => {
  try {
    const postId = request.params.id;

    const doc = new CommentModel({
      text: request.body.text,
      post: postId,
      user: request.userId,
    });

    const comment = await doc.save();

    const postRelated = await PostModel.findById(postId);

    postRelated.comments.push(comment);
    const post = await postRelated.save();

    return response.json(post.comments);
  } catch (error) {
    console.log(error);

    return response.status(500).json({
      message: "Failed to add comment",
    });
  }
};

export const getLastComments = async (request, response) => {
  try {
    const comments = await CommentModel.find()
      .populate("user", "-passwordHash")
      .exec();

    const lastComments = comments.slice(-5);
    return response.json(lastComments);
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "Failed to retrieve a last comments",
    });
  }
};
