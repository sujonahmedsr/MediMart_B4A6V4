import { ICategory } from "./category";

export interface IMedicine {
    _id: string,
    name: string,
    image?: string | undefined,
    price: number | string,
    category: ICategory,
    description: string,
    quantity: number | string,
    inStock: boolean,
    expireDate: Date,
    manufacturerDetails: string,
    requiredPrescription: boolean
}

interface Category {
    categoryId: string,
    categoryName: string
}

export interface ICategoryMedicine {
    _id: Category,
    products: IMedicine[]
}