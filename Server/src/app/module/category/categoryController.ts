import { StatusCodes } from "http-status-codes"
import asyncFunc from "../../utils/asyncFunc"
import sendResponse from "../../utils/sendRespose"
import { categoryServices } from "./categoryServices"

const createCategory = asyncFunc(async (req, res) => {
    const result = await categoryServices.createCategoryDb(req.body)
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: 'Product created successfully',
        data: result
    })
})

export const categoryController = {
    createCategory
}