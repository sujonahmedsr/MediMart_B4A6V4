import { Types } from "mongoose";
import AppError from "../../errors/AppError";
import { Tuser } from "../../interfaces/errors";
import { productModel } from "../products/productsSchmeModel"
import { userModel } from "../User Model/userSchema.model";
import { orderUtils } from "./order.utils";
import { orderModel } from "./ordersSchemaModel"
import { StatusCodes } from "http-status-codes";


// create order 
const createOrder = async (user: Tuser, payload: { products: { _id: string; quantity: number }[] }, client_ip: string) => {
    const id = user?.id
    const userData = await userModel.findById(id)
    if (!payload?.products?.length)
        throw new AppError(403, "Order is not specified");

    const products = payload.products;


    let totalPrice = 0;
    const productDetails = await Promise.all(
        products.map(async (item) => {
            const product = await productModel.findById(item._id);
            if (product) {
                const subtotal = product ? (product.price || 0) * item.quantity : 0;
                totalPrice += subtotal;
                return item;
            }
        })
    );

    const transformedProducts: any[] = [];

    productDetails.forEach(product => {
        transformedProducts.push({
            product: product?._id,
            quantity: product?.quantity,
        });
    });


    let order = await orderModel.create({
        user: id,
        products: transformedProducts,
        totalPrice,
    });

    // payment integration
    const shurjopayPayload = {
        amount: totalPrice,
        order_id: order._id,
        currency: "BDT",
        customer_name: userData?.name,
        customer_address: userData?.address,
        customer_email: userData?.email,
        customer_phone: userData?.phone,
        customer_city: userData?.city,
        client_ip,
    };

    const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

    if (payment?.transactionStatus) {
        order = await order.updateOne({
            transaction: {
                id: payment.sp_order_id,
                transactionStatus: payment.transactionStatus,
            },
        });
    }

    return payment.checkout_url;

}

// const createOrder = async (user: Tuser, payload: { products: { product: string; quantity: number }[] }, client_ip: string) => {
//     const id = user?.id
//     const userData = await userModel.findById(id)
//     if (!payload?.products?.length)
//         throw new AppError(403, "Order is not specified");

//     const products = payload.products;



//     let totalPrice = 0;
//     const productDetails = await Promise.all(
//         products.map(async (item) => {
//             const product = await productModel.findById(item.product);
//             if (product) {
//                 const subtotal = product ? (product.price || 0) * item.quantity : 0;
//                 totalPrice += subtotal;
//                 return item;
//             }
//         })
//     );
//     console.log("product details",productDetails);

//     console.log(totalPrice);


//     let order = await orderModel.create({
//         user: id,
//         products: productDetails,
//         totalPrice,
//     });

//     // payment integration
//     const shurjopayPayload = {
//         amount: totalPrice,
//         order_id: order._id,
//         currency: "BDT",
//         customer_name: userData?.name,
//         customer_address: userData?.address,
//         customer_email: userData?.email,
//         customer_phone: userData?.phone,
//         customer_city: userData?.city,
//         client_ip,
//     };

//     const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

//     if (payment?.transactionStatus) {
//         order = await order.updateOne({
//             transaction: {
//                 id: payment.sp_order_id,
//                 transactionStatus: payment.transactionStatus,
//             },
//         });
//     }

//     return payment.checkout_url;


// }

// for revenue 
const getUserAllOrder = async (user: Tuser) => {
    const result = await orderModel.find({ user: user?.id }).populate("user")

    return result
}
const getAdminAllConOrder = async () => {
    const totalRevenue = await orderModel.aggregate([
        {
            $unwind: "$products" // Flatten products array to access each product's quantity
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$totalPrice" },
                totalSell: { $sum: "$products.quantity" } // Sum all product quantities
            }
        },
        {
            $project: { _id: 0, totalRevenue: 1, totalSell: 1 }
        }
    ]);

    const allOrders = await orderModel.find().populate("user")
    return { allOrders, totalRevenue: totalRevenue[0] || { totalRevenue: 0, totalSell: 0 } }
}

const verifyPayment = async (order_id: string) => {
    const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);
    if (verifiedPayment[0]?.customer_order_id) {
        const findOrder = await orderModel.findById(
            verifiedPayment[0]?.customer_order_id,
        );
        for (const item of findOrder?.products as {
            product: Types.ObjectId;
            quantity: number;
        }[]) {
            const bike = await productModel.findById(item.product);
            if (!bike || bike.quantity < item.quantity) {
                throw new AppError(StatusCodes.CONFLICT, `Not enough stock for ${bike?.name}`);
            }

            bike.quantity -= item.quantity;
            if (bike.quantity === 0) {
                bike.inStock = false;
            }

            await bike.save();
        }
    }

    if (verifiedPayment.length) {
        await orderModel.findOneAndUpdate(
            {
                "transaction.id": order_id,
            },
            {
                "transaction.bank_status": verifiedPayment[0].bank_status,
                "transaction.sp_code": verifiedPayment[0].sp_code,
                "transaction.sp_message": verifiedPayment[0].sp_message,
                "transaction.transactionStatus": verifiedPayment[0].transaction_status,
                "transaction.method": verifiedPayment[0].method,
                "transaction.date_time": verifiedPayment[0].date_time,
                status:
                    verifiedPayment[0].bank_status == "Success"
                        ? "Paid"
                        : verifiedPayment[0].bank_status == "Failed"
                            ? "Pending"
                            : verifiedPayment[0].bank_status == "Cancel"
                                ? "Cancelled"
                                : "",
            }
        );
    }

    return verifiedPayment;
};
export const orderServices = {
    createOrder,
    getUserAllOrder,
    getAdminAllConOrder,
    verifyPayment
}