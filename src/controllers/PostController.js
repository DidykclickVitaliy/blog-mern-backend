import PostService from "../services/PostService.js";
import PostModel from "../models/Post.js";

class PostController {
  async getAllPosts(request, response) {
    try {
      const posts = await PostService.getAllPosts();

      return response.json(posts);
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: "Failed to get articles",
      });
    }
  }

  async getOnePost(request, response) {
    try {
      const postId = request.params.id;

      PostModel.findOneAndUpdate(
        {
          _id: postId,
        },
        {
          $inc: { viewsCount: 1 },
        },
        {
          returnDocument: "after",
        },
        (err, doc) => {
          if (err) {
            console.log(err);
            return response.status(500).json({
              message: "Failed to retrieve article",
            });
          }

          if (!doc) {
            return response.status(404).json({
              message: "Failed to find article",
            });
          }

          return response.json(doc);
        }
      )
        .populate("user", "-passwordHash")
        .populate({
          path: "comments",
          populate: {
            path: "user",
            select: "-passwordHash",
          },
        });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: "Failed to get article",
      });
    }
  }

  async createPost(request, response) {
    try {
      const post = await PostService.createPost({
        title: request.body.title,
        text: request.body.text,
        tags: request.body.tags,
        imageUrl: request.body.imageUrl,
        user: request.userId,
      });

      return response.json(post);
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: "Failed to create article",
      });
    }
  }

  async removePost(request, response) {
    try {
      const postId = request.params.id;

      PostModel.findOneAndDelete(
        {
          _id: postId,
        },
        (err, doc) => {
          if (err) {
            return response.status(500).json({
              message: "Failed to delete article",
            });
          }

          if (!doc) {
            return response.status(404).json({
              message: "Failed to find article",
            });
          }

          return response.json({
            success: true,
            postId,
          });
        }
      );
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: "Cannot remove article",
      });
    }
  }

  async updatePost(request, response) {
    try {
      const post = await PostService.updatePost({
        postId: request.params.id,
        title: request.body.title,
        text: request.body.text,
        imageUrl: request.body.imageUrl,
        user: request.userId,
        tags: request.body.tags,
      });

      return response.json({
        success: true,
        post,
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: "Failed to update article",
      });
    }
  }

  async getLastTags(request, response) {
    try {
      const tags = await PostService.getLastTags();

      return response.json(tags);
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: "Failed to get tags",
      });
    }
  }

  async getPostsByTag(request, response) {
    try {
      const tag = request.params.tag;
      const posts = await PostService.getPostsByTag(tag);

      return response.json(posts);
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: "Failed to get posts by tags",
      });
    }
  }
}

export default new PostController();
