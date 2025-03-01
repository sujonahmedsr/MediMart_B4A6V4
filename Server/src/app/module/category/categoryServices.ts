import { categoryInterface } from "./categoryInterface"
import { categoryModel } from "./categorySchemaModel"

const createCategoryDb = async (body: categoryInterface) => {
    const result = await categoryModel.create(body)
    return result
}

export const categoryServices = {
    createCategoryDb
}