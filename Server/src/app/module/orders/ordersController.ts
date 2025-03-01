import { orderServices } from "./orderServices";
import asyncFunc from "../../utils/asyncFunc";
import sendResponse from "../../utils/sendRespose";
import { StatusCodes } from "http-status-codes";
import { Tuser } from "../../interfaces/errors";

const createConOrder = asyncFunc(async (req, res) => {
    const body = req.body;
    const user = req.user as Tuser

    const result = await orderServices.createOrder(user, body, req.ip!);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: 'Order created successfully',
        data: result
    })
})

const getUserAllConOrder = asyncFunc(async (req, res) => {
    const user = req.user as Tuser
    const result = await orderServices.getUserAllOrder(user);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'All orders retrives successfully',
        data: result
    })
})
const getAdminAllConOrder = asyncFunc(async (req, res) => {
    const result = await orderServices.getAdminAllConOrder();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'All orders retrives successfully',
        data: result
    })
})

const verifyPayment = asyncFunc(async (req, res) => {
    const order = await orderServices.verifyPayment(req.query.order_id as string);
  
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: "Order verified successfully",
      data: order,
    });
  });

export const orderController = {
    createConOrder,
    getUserAllConOrder,
    getAdminAllConOrder,
    verifyPayment
}