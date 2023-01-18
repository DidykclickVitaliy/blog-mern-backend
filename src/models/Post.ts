import { Schema, model, Document } from 'mongoose';

interface IPost {
    title: string;
    text: string;
    tags?: string[];
    viewsCount?: number;
    user: string;
    comments?: string[];
    imageUrl?: string;
}

export interface IPostModel extends IPost, Document {
    createdAt: Date;
    updatedAt: Date;
    _doc?: any;
}

const PostSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        text: { type: String, required: true },
        tags: { type: Array, default: [] },
        viewsCount: { type: Number, default: 0 },
        user: { type: Schema.Types.ObjectId, ref: 'User', require: true },
        comments: {
            type: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
            default: []
        },
        imageUrl: String
    },
    {
        timestamps: true
    }
);

export default model<IPostModel>('Post', PostSchema);
