import { model, Schema, Types } from "mongoose";
import { productInterface } from "./productsInterface";

// Product Schema
const productSchema = new Schema<productInterface>({
    name: {
        type: String,
        required: [true, 'Name field is required'],
        trim: true
    },
    image: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        required: [true, 'Price field is required'],
        min: [0, 'Price cannot be negative']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    },
    description: {
        type: String,
        required: [true, 'Description field is required'],
        trim: true
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity field is required'],
        min: [0, 'Quantity cannot be negative']
    },
    inStock: {
        type: Boolean,
        required: [true, 'InStock field is required'],
        default: true
    },
    expireDate: {
        type: Date,
        required: [true, 'Expire Date is required']
    },
    manufacturerDetails: {
        type: String,
        required: [true, 'Manufacturer Details is required'],
        trim: true
    },
    requiredPrescription: {
        type: Boolean,
        required: [true, 'Required Prescription field is required'],
        default: false
    }
}, { timestamps: true, versionKey: false });

// Create Product model
export const productModel = model<productInterface>('Product', productSchema);
