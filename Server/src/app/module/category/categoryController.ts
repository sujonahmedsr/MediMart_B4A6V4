import { StatusCodes } from "http-status-codes"
import asyncFunc from "../../utils/asyncFunc"
import sendResponse from "../../utils/sendRespose"
import { categoryServices } from "./categoryServices"

const createCategory = asyncFunc(async (req, res) => {
    const result = await categoryServices.createCategoryDb(req.body)
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: 'Category created successfully',
        data: result
    })
})

const getAllCategory = asyncFunc (async (req, res) => {
    const result = await categoryServices.getAllCategory(req.query)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Categories retrieved successfully',
        data: result
    })
})
const singleCategory = asyncFunc (async (req, res) => {
    const {id} = req.params
    const result = await categoryServices.singleCategory(id)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Categories retrieved successfully',
        data: result
    })
})

const deleteCategory = asyncFunc (async (req, res) => {
    const {id} = req.params
    const result = await categoryServices.deleteCategory(id)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Categories Deleted successfully',
        data: null
    })
})

export const categoryController = {
    createCategory,
    getAllCategory,
    deleteCategory,
    singleCategory
}