import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { productInterface } from "./productsInterface";
import { productModel } from "./productsSchmeModel";
import QuiryBuilder from "../../QuiryBuilder/QuiryBuilder";


// create post 
const createProduct = async (payload: productInterface) => {
    const result = await productModel.create(payload)
    return result
}
// get all products 
const getProducts = async (query: Record<string, unknown>) => {
    const searchableFields = ['description', 'type', 'brand', 'name'];
    const productQuery = new QuiryBuilder(productModel.find(), query)
        .search(searchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await productQuery.modelQuery;
    const meta = await productQuery.countTotal();
    
    return {
        meta,
        result,
    };

}
// get single product 
const getSingleProducts = async (id: string) => {

    const result = await productModel.findById(id)
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