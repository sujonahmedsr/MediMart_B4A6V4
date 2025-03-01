import { model, Schema } from "mongoose";
import { orderInterface } from "./ordersInterface";

// create scheme for orders 
const orderShchema = new Schema(
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
            ref: "products",
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
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
export const orderModel = model('orders', orderShchema)

