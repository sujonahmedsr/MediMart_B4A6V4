import { Request, Response } from "express"
import asyncFunc from "../../utils/asyncFunc"
import sendResponse from "../../utils/sendRespose"
import { StatusCodes } from "http-status-codes"
import { adminServices } from "./adminServices"

const userBlockedByAdmin = asyncFunc(async (req: Request, res: Response) => {
    const { userId } = req.params
    const body = req.body

    await adminServices.blockUserDb(userId, body)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'User blocked successfully'
    })
})
const allGetuser = asyncFunc(async (req: Request, res: Response) => {
    const result = await adminServices.getAllUser()
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'All user reterive successfully',
        data: result
    })
})


export const adminController = {
    userBlockedByAdmin,
    allGetuser
}