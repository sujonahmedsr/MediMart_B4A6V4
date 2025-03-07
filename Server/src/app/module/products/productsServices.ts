import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { productInterface } from "./productsInterface";
import { productModel } from "./productsSchmeModel";
import QuiryBuilder from "../../QuiryBuilder/QuiryBuilder";
import { categoryModel } from "../category/categorySchemaModel";


// create post 
const createProduct = async (payload: productInterface) => {
    const isCategoryExist = await categoryModel.findById(payload?.category)
    if (!isCategoryExist) {
        throw new AppError(StatusCodes.NOT_FOUND, "Category not existed.")
    }
    const result = await productModel.create(payload)
    return result
}
// get all products 

const getProducts = async (query: Record<string, unknown>) => {
    const { categories, ...Qquery } = query

    let filter: Record<string, unknown> = {}

    // Filter by categories
    if (categories) {
        const categoryArray = typeof categories === 'string'
            ? categories.split(',')
            : Array.isArray(categories)
                ? categories
                : [categories];
        filter.category = { $in: categoryArray };
    }

    const searchableFields = ["description", "name"];

    const productQuery = new QuiryBuilder(
        productModel.find(filter).populate("category", "name icon"),
        Qquery
    )
        .search(searchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await productQuery.modelQuery.lean();
    const meta = await productQuery.countTotal();

    return {
        meta,
        result,
    };
};

// get single product 
const getSingleProducts = async (id: string) => {

    const result = await productModel.findById(id).populate("category", "name icon")
    if (!result) {
        throw new AppError(StatusCodes.NOT_FOUND, 'This product is not found !')
    }
    return result
}
// update single product 
const updateSingleProducts = async (id: string, body: productInterface) => {
    const result = await productModel.findByIdAndUpdate(id, body, { new: true })
    if (!result) {
        throw new AppError(StatusCodes.NOT_FOUND, 'This product is not found !')
    }
    return result
}
// delete single product 
const deleteSingleProducts = async (id: string) => {
    const result = await productModel.findByIdAndDelete(id)
    if (!result) {
        throw new AppError(StatusCodes.NOT_FOUND, 'This product is not found !')
    }
    return result
}

export const productServices = {
    createProduct,
    getProducts,
    getSingleProducts,
    updateSingleProducts,
    deleteSingleProducts
}