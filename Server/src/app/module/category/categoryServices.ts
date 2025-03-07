import { StatusCodes } from "http-status-codes"
import { categoryInterface } from "./categoryInterface"
import { categoryModel } from "./categorySchemaModel"
import AppError from "../../errors/AppError"
import { productModel } from "../products/productsSchmeModel"
import QuiryBuilder from "../../QuiryBuilder/QuiryBuilder"

const createCategoryDb = async (body: categoryInterface) => {
    const result = await categoryModel.create(body)
    return result
}

const getAllCategory = async (query: Record<string, unknown>) => {
    const categoryQuery = new QuiryBuilder(categoryModel.find(), query)
        .sort()
        .paginate()
    const result = await categoryQuery.modelQuery.lean()
    const meta = await categoryQuery.countTotal();
    return {
        meta,
        result,
    };
}

const singleCategory = async (id: string) => {
    const result = await categoryModel.findById(id)
    if (!result) {
        throw new AppError(StatusCodes.NOT_FOUND, 'This Category product is not found !')
    }
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
    deleteCategory,
    singleCategory
}