import { Router } from "express";
import { categoryController } from "./categoryController";
import authMid from "../Authentication/authMid";

const categoryRoute = Router()

categoryRoute.post('/create', authMid("admin"), categoryController.createCategory)
categoryRoute.get('/', categoryController.getAllCategory)
categoryRoute.get('/:id', categoryController.singleCategory)
categoryRoute.delete('/:id', authMid("admin"), categoryController.deleteCategory)

export default categoryRoute