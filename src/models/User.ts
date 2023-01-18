import { Schema, model, Document } from 'mongoose';

interface IUser {
    fullName: string;
    email: string;
    passwordHash: string;
    avatarUrl?: string;
}

export interface IUserModel extends IUser, Document {
    createdAt: Date;
    updatedAt: Date;
    _doc?: any;
}

const UserSchema: Schema = new Schema(
    {
        fullName: { type: String, require: true, unique: true },
        email: { type: String, require: true, unique: true },
        passwordHash: { type: String, require: true },
        avatarUrl: String
    },
    {
        timestamps: true
    }
);

export default model<IUserModel>('User', UserSchema);
