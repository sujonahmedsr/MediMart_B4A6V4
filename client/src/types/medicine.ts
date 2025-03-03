import { ICategory } from "./category";

export interface IMedicine {
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