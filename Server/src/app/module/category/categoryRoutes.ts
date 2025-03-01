import { Router } from "express";
import { categoryController } from "./categoryController";

const categoryRoute = Router()

categoryRoute.post('/create', categoryController.createCategory)
categoryRoute.get('/', categoryController.getAllCategory)
categoryRoute.delete('/:id', categoryController.deleteCategory)

export default categoryRoute