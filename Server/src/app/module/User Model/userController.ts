import { Request, Response } from "express"
import asyncFunc from "../../utils/asyncFunc"
import { userServices } from "./userServices"
import sendResponse from "../../utils/sendRespose"
import { StatusCodes } from "http-status-codes"

const registerUser = asyncFunc(async (req: Request, res: Response) => {
    const body = req.body
    
    const result = await userServices.resgisterUserIntoDb(body)
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: 'User registered successfully',
        data: result
    })
})

const loginUser = asyncFunc(async (req: Request, res: Response) => {
    const body = req.body
    const result = await userServices.loginUserDb(body)
    res.cookie("token", result?.token, { httpOnly: true });
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Login successful',
        data: result
    })
})

const resetPassword = asyncFunc(async (req: Request, res: Response) => {
    const body = req.body
    const user = req.user
    
    await userServices.resetPassword(body, user)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Password Change Successfull.',
        data: null
    })
})

const getSingleUser = asyncFunc(async (req: Request, res: Response) => {
    const {id} = req.params
    const result = await userServices.singleUser(id)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Get single user Successfull.',
        data: result
    })
})
const updateUser = asyncFunc(async (req: Request, res: Response) => {
    const {id} = req.user
    
    const result = await userServices.updateUser(id, req.body)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'User updated Successfull.',
        data: result
    })
})

const logOut = asyncFunc(async (req: Request, res: Response) => {
    res.clearCookie("token");
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'User Logout...',
        data: null
    })
})
export const userController = {
    registerUser,
    loginUser,
    resetPassword,
    getSingleUser,
    updateUser,
    logOut
}