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

const getAllProductsByCategory = async () => {
    try {
        const products = await productModel.aggregate([
            {
                $lookup: {
                    from: "categories", // ক্যাটাগরি কালেকশন
                    localField: "category", // প্রোডাক্ট মডেলের category ফিল্ড
                    foreignField: "_id", // ক্যাটাগরি মডেলের _id
                    as: "categoryDetails"
                }
            },
            {
                $unwind: "$categoryDetails" // ক্যাটাগরি অ্যারেকে অবজেক্ট বানানোর জন্য
            },
            {
                $group: {
                    _id: { categoryId: "$categoryDetails._id", categoryName: "$categoryDetails.name" }, // productType অনুযায়ী গ্রুপিং
                    // totalProducts: { $sum: 1 },
                    // totalQuantity: { $sum: "$quantity" },
                    // avgPrice: { $avg: "$price" },
                    products: {
                        $push: {
                            _id: "$_id",
                            name: "$name",
                            image: "$image",
                            price: "$price",
                            description: "$description",
                            quantity: "$quantity",
                            inStock: "$inStock",
                            expireDate: "$expireDate",
                            manufacturerDetails: "$manufacturerDetails",
                            requiredPrescription: "$requiredPrescription",
                            createdAt: "$createdAt",
                            updatedAt: "$updatedAt",
                            category: {
                                _id: "$categoryDetails._id",
                                name: "$categoryDetails.name",
                                icon: "$categoryDetails.icon"
                            }
                        }
                    } // সব প্রোডাক্ট লিস্ট হিসেবে সংরক্ষণ
                }
            },
            {
                $addFields: {
                    products: { $slice: ["$products", 4] } // সর্বোচ্চ ৫টি প্রোডাক্ট রাখা
                }
            },
            { $sort: { totalProducts: -1 } } // বেশি প্রোডাক্ট থাকা টাইপগুলো আগে আসবে
        ]);

        return products
    } catch (error) {
        console.error(error);
    }
}

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
    getAllProductsByCategory,
    getSingleProducts,
    updateSingleProducts,
    deleteSingleProducts
}