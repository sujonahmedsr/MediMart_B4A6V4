import { Router } from "express";
import { categoryController } from "./categoryController";

const categoryRoute = Router()

categoryRoute.post('/create', categoryController.createCategory)
// categoryRoute.get('/')
// categoryRoute.delete('/:id')

export default categoryRoute