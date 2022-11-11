import PostModel from "../models/Post.js";

export const getAllPosts = async (request, response) => {
  try {
    const posts = await PostModel.find()
      .populate("user", "-passwordHash")
      .exec();

    return response.json(posts);
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "Failed to get articles",
    });
  }
};

export const getOnePost = (request, response) => {
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
};

export const createPost = async (request, response) => {
  try {
    const doc = new PostModel({
      title: request.body.title,
      text: request.body.text,
      tags: request.body.tags,
      imageUrl: request.body.imageUrl,
      user: request.userId,
    });

    const post = await doc.save();

    return response.json(post);
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "Failed to create article",
    });
  }
};

export const removePost = (request, response) => {
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
};

export const updatePost = async (request, response) => {
  try {
    const postId = request.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: request.body.title,
        text: request.body.text,
        imageUrl: request.body.imageUrl,
        user: request.userId,
        tags: request.body.tags,
      }
    );

    return response.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "Failed to update article",
    });
  }
};

export const getLastTags = async (request, response) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts
      .map((post) => post.tags)
      .flat()
      .slice(0, 5);

    return response.json(tags);
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "Failed to get tags",
    });
  }
};

export const getPostsByTag = async (request, response) => {
  try {
    const tag = request.params.tag;
    const posts = await PostModel.find({ tags: tag })
      .populate("user", "-passwordHash")
      .populate("comments")
      .exec();

    return response.json(posts);
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "Failed to get posts by tags",
    });
  }
};
