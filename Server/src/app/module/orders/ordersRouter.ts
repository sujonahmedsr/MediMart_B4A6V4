import { Router } from "express";
import { orderController } from "./ordersController";
import authMid from "../Authentication/authMid";

const orderRouter = Router()

orderRouter.patch("/verify", authMid("admin"), orderController.verifyPayment);

orderRouter.post('/create-order', authMid("customer", "admin"), orderController.createConOrder)
orderRouter.get('/userAllOrders', authMid("customer", "admin"), orderController.getUserAllConOrder)
orderRouter.get('/adminAllOrders', authMid("admin"), orderController.getAdminAllConOrder)

export default orderRouter;