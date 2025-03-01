import { Router } from "express";
import { productController } from "./productsController";
import authMid from "../Authentication/authMid";

const productsRouter = Router()

productsRouter.post('/create', productController.createConProduct)
productsRouter.get('/',  productController.getConProduct)
productsRouter.get('/:id',  productController.getSingleConProduct)
productsRouter.patch('/:id', productController.updateSingleConProduct)
productsRouter.delete('/:id', productController.deleteSingleConProduct)

export default productsRouter