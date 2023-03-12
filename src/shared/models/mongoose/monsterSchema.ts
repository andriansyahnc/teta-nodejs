import mongoose, { Schema } from 'mongoose';
import slugify from "slugify";

export interface IMonster {
    name: string;
    nickname?: string;
    types: string[];
    image: string;
    description?: string;
    height?: string;
    weight?: string;
    hp?: number;
    attack?: number;
    defense?: number;
    speed?: number;
    slug?: string;
    isDeleted?: boolean;
}

export interface FilterMonster {
    name?: string;
    nickname?: string;
    types?: string[];
    image?: string;
    description?: string;
    height?: string;
    weight?: string;
    hp?: number;
    attack?: number;
    defense?: number;
    speed?: number;
    slug?: string;
    isDeleted?: boolean;
}

const monsterSchema = new Schema<IMonster>({
    name: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        required: false,
    },
    types: {
        type: [String],
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    height: {
        type: String,
        required: false,
    },
    weight: {
        type: String,
        required: false,
    },
    hp: {
        type: Number,
        required: false,
    },
    attack: {
        type: Number,
        required: false,
    },
    defense: {
        type: Number,
        required: false,
    },
    speed: {
        type: Number,
        required: false,
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

monsterSchema.pre<IMonster>('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    if (!this.isDeleted) {
        this.isDeleted = false;
    }
    next();
});

const Monster = mongoose.model<IMonster>('Monster', monsterSchema);

export default Monster;
