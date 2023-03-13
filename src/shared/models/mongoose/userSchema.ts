import mongoose, { Schema } from 'mongoose';
import slugify from "slugify";

export interface IUser {
    _id?: string;
    name: string;
    password: string;
    role: string;
    slug: string;
    isDeleted: boolean;
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: false,
        unique: true,
    },
    isDeleted: {
        type: Boolean,
        required: false,
    }
}, { timestamps: true });

userSchema.pre<IUser>('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    if (!this.isDeleted) {
        this.isDeleted = false;
    }
    next();
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
