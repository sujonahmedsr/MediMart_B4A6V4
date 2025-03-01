import { Types } from "mongoose";

// product interface cretae 
export interface productInterface {
    name: string,
    image?: string,
    brand: string,
    price: number,
    category: Types.ObjectId,
    description: string,
    quantity: number,
    inStock: boolean,
    expireDate: Date,
    manufacturerDetails: string
}