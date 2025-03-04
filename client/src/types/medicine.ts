import { ICategory } from "./category";

export interface IMedicine {
    _id: string,
    name: string,
    image?: string,
    price: number,
    category: ICategory,
    description: string,
    quantity: number,
    inStock: boolean,
    expireDate: Date,
    manufacturerDetails: string,
    requiredPrescription: boolean
}