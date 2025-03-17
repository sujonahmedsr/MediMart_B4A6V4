import { Document, Types } from "mongoose";

export interface orderInterface extends Document {
  user: Types.ObjectId;
  products: {
    product: Types.ObjectId;
    quantity: number;
  }[];
  presCription?: string,
  totalPrice: number;
  status: "Pending" | "Paid" | "Processing" | "Shipped" | "Delivered";
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}