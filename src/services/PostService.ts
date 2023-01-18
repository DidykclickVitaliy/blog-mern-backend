import PostModel from '../models/Post.js';

class PostService {
    public async getAllPosts() {
        const posts = await PostModel.find().populate('user', '-passwordHash').exec();

        return posts;
    }

    public async createPost(params: Record<string, string>) {
        const { title, text, tags, imageUrl, user } = params;

        const doc = new PostModel({ title, text, tags, imageUrl, user });
        const post = await doc.save();

        return post;
    }

    public async updatePost(params: Record<string, string>) {
        const { id, title, text, imageUrl, user, tags } = params;

        const post = await PostModel.updateOne(
            {
                _id: id
            },
            { title, text, imageUrl, user, tags }
        );

        return post;
    }

    public async getLastTags() {
        const posts = await PostModel.find().limit(5).exec();

        const tags = posts
            .map((post) => post.tags)
            .flat()
            .slice(0, 5);

        return tags;
    }

    public async getPostsByTag(tag: string) {
        const posts = await PostModel.find({ tags: tag }).populate('user', '-passwordHash').populate('comments').exec();

        return posts;
    }
}

export default new PostService();
