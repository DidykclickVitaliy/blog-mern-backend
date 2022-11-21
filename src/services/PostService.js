import PostModel from "../models/Post.js";

class PostService {
  async getAllPosts() {
    const posts = await PostModel.find()
      .populate("user", "-passwordHash")
      .exec();

    return posts;
  }

  async createPost(params) {
    const { title, text, tags, imageUrl, user } = params;

    const doc = new PostModel({ title, text, tags, imageUrl, user });
    const post = await doc.save();

    return post;
  }

  async updatePost(params) {
    const { postId, title, text, imageUrl, user, tags } = params;

    const post = await PostModel.updateOne(
      {
        _id: postId,
      },
      { title, text, imageUrl, user, tags }
    );

    return post;
  }

  async getLastTags() {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts
      .map((post) => post.tags)
      .flat()
      .slice(0, 5);

    return tags;
  }

  async getPostsByTag(tag) {
    const posts = await PostModel.find({ tags: tag })
      .populate("user", "-passwordHash")
      .populate("comments")
      .exec();

    return posts;
  }
}

export default new PostService();
