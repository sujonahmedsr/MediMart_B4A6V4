import { model, Schema } from "mongoose";
import { productInterface } from "./productsInterface";

// product schema create with interface
const productSchema = new Schema<productInterface>({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    image: {
        type: String,
        required: [true, 'Image field is required']
    },
    brand: {
        type: String,
        required: [true, 'Brand field is required']
    },
    price: {
        type: Number,
        required: [true, 'Price field is required']
    },
    type: {
        type: String,
        enum: {
            values: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
            message: '{VALUE} is not valid'
        },
        required: [true, 'Type field is required']
    },
    description: {
        type: String,
        required: [true, 'Description field is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity field is required']
    },
    inStock: {
        type: Boolean,
        required: [true, 'InStock field is required'],
        default: true
    },

}, { timestamps: true, versionKey: false })

// create model 
export const productModel = model<productInterface>('products', productSchema)