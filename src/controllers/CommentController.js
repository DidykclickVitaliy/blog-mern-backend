import CommentService from "../services/CommentService.js";

class CommentController {
  async createComment(request, response) {
    try {
      const text = request.body.text;
      const postId = request.params.id;
      const userId = request.userId;

      const comment = await CommentService.createComment({
        text,
        postId,
        userId,
      });

      return response.json(comment);
    } catch (error) {
      console.log(error);

      return response.status(500).json({
        message: "Failed to add comment",
      });
    }
  }

  async getLastComments(request, response) {
    try {
      const comments = await CommentService.getLastComments();

      return response.json(comments);
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: "Failed to retrieve a last comments",
      });
    }
  }
}

export default new CommentController();
