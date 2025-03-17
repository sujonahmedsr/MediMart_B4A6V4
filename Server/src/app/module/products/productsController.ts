import { Request, Response } from "express";
import { productServices } from "./productsServices";
import asyncFunc from "../../utils/asyncFunc";
import sendResponse from "../../utils/sendRespose";
import { StatusCodes } from "http-status-codes";

// create product 
const createConProduct = asyncFunc(async (req, res) => {
    const body = req.body;
    const result = await productServices.createProduct(body)
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: 'Product created successfully',
        data: result
    })
})

// get alls product 
const getConProduct = asyncFunc(async (req, res) => {
    const queryData = req?.query;
    const result = await productServices.getProducts(queryData)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Products retrieved successfully',
        data: result,
    })
})
const getAllProductsByCategory = asyncFunc(async (req, res) => {
    const result = await productServices.getAllProductsByCategory()
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'All Products by category retrieved successfully',
        data: result,
    })
})


// get single product 
const getSingleConProduct = asyncFunc(async (req, res) => {
    const id = req.params.id
    const result = await productServices.getSingleProducts(id)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Product retrieved successfully',
        data: result
    })
})

// update single product 
const updateSingleConProduct = asyncFunc(async (req, res) => {
    const body = req.body
    const id = req.params.id
    const result = await productServices.updateSingleProducts(id, body)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Product updated successfully',
        data: result
    })
})

// delete single 
const deleteSingleConProduct = asyncFunc(async (req, res) => {
    const id = req.params.id
    await productServices.deleteSingleProducts(id)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Product deleted successfully',
        data: null
    })
})

export const productController = {
    createConProduct,
    getConProduct,
    getAllProductsByCategory,
    getSingleConProduct,
    updateSingleConProduct,
    deleteSingleConProduct
}