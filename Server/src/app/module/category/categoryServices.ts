import { StatusCodes } from "http-status-codes"
import { categoryInterface } from "./categoryInterface"
import { categoryModel } from "./categorySchemaModel"
import AppError from "../../errors/AppError"
import { productModel } from "../products/productsSchmeModel"

const createCategoryDb = async (body: categoryInterface) => {
    const result = await categoryModel.create(body)
    return result
}

const getAllCategory = async () => {
    const result = await categoryModel.find()
    return result
}

const deleteCategory = async (id: string) => {
    const categoryProduct = await productModel.findOne({ category: id })
    if (categoryProduct) throw new AppError(StatusCodes.BAD_REQUEST, "You can not delete the Category. Because the Category is related to products.");

    const result = await categoryModel.findByIdAndDelete(id)
    if (!result) {
        throw new AppError(StatusCodes.NOT_FOUND, 'This Category is not found !')
    }

    return result
}

export const categoryServices = {
    createCategoryDb,
    getAllCategory,
    deleteCategory
}