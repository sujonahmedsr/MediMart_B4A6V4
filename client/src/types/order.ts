import { IMedicine } from "./medicine";
import { IUser } from "./user";

export interface IOrders {
    _id: string,
    user: IUser,
    products: {
        product: IMedicine;
        quantity: number;
    }[],
    presCription: string,
    totalPrice: number,
    status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Paid" | "Cancelled",
    transaction: {
        id: string
    },
    createdAt: Date
}