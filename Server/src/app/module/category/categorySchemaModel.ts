import { Schema } from "mongoose";
import { model } from "mongoose";
import { categoryInterface } from "./categoryInterface";

const categorySchema = new Schema<categoryInterface>({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: true,
        trim: true
    },
    icon: {
        type: String,
        default: null
    }
}, { timestamps: true, versionKey: false });

export const categoryModel = model<categoryInterface>('Category', categorySchema);