import { Router } from "express";
import authMid from "../Authentication/authMid";
import { adminController } from "./adminController";

const adminRouter = Router()

adminRouter.get('/users', authMid('admin'), adminController.allGetuser)
adminRouter.patch('/users/:userId/block', authMid('admin'), adminController.userBlockedByAdmin)


export default adminRouter