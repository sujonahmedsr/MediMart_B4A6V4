import { model, Schema } from "mongoose";
import { orderInterface } from "./ordersInterface";

// create scheme for orders 
const orderShchema = new Schema<orderInterface>(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      products: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
      presCription: {
        type: String,
        default: null,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ["Pending", "Paid", "Shipped", "Completed", "Cancelled"],
        default: "Pending",
      },
      transaction: {
        id: String,
        transactionStatus: String,
        bank_status: String,
        sp_code: String,
        sp_message: String,
        method: String,
        date_time: String,
      },
    },
    {
      timestamps: true,
    }
  );

// create model for order 
export const orderModel = model<orderInterface>('orders', orderShchema)

