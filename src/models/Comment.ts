import { Schema, model, Document, Types } from 'mongoose';

interface IComment {
    text: string;
    post: string;
    user: string;
}

export interface ICommentModel extends IComment, Document {
    createdAt: Date;
    updatedAt: Date;
    _doc?: any;
}

const CommentSchema: Schema = new Schema(
    {
        text: { type: String, trim: true, require: true },
        post: { type: Schema.Types.ObjectId, ref: 'Post', require: true },
        user: { type: Schema.Types.ObjectId, ref: 'User', require: true }
    },
    {
        timestamps: true
    }
);

export default model<ICommentModel>('Comment', CommentSchema);
