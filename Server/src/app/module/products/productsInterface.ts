import { Types } from "mongoose";

// product interface cretae 
export interface productInterface {
    name: string,
    image?: string,
    price: number,
    category: Types.ObjectId,
    description: string,
    quantity: number,
    inStock: boolean,
    expireDate: Date,
    manufacturerDetails: string,
    requiredPrescription: boolean
}