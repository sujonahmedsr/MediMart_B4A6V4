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
    },
    brand: {
        type: String,
        required: [true, 'Brand field is required']
    },
    price: {
        type: Number,
        required: [true, 'Price field is required']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required'],
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
    expireDate: {
        type: Date,
        required: [true, 'expireDate  is required'],
    },
    manufacturerDetails: {
        type: String,
        required: [true, 'Manufacturer Details  is required'],
    }

}, { timestamps: true, versionKey: false })

// create model 
export const productModel = model<productInterface>('Product', productSchema)