import mongoose, { Schema, Document } from 'mongoose';

export interface IMonster extends Document {
    name: string;
    type: string;
    image: string;
    captured: boolean;
}

const monsterSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    image: { type: String, required: true },
    captured: { type: Boolean, default: false },
});

const Monster = mongoose.model<IMonster>('Monster', monsterSchema);

export default Monster;
