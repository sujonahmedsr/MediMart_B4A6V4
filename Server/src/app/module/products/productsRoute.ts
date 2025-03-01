import { Router } from "express";
import { productController } from "./productsController";
import authMid from "../Authentication/authMid";
import validateRequest from "../../middlewares/validateRequest";
import { productValidationSchema } from "./productValidation";

const productsRouter = Router()



productsRouter.post('/create', authMid("admin"), validateRequest(productValidationSchema), productController.createConProduct)
productsRouter.get('/',  productController.getConProduct)
productsRouter.get('/:id',  productController.getSingleConProduct)
productsRouter.patch('/:id', authMid("admin"), productController.updateSingleConProduct)
productsRouter.delete('/:id',  authMid("admin"), productController.deleteSingleConProduct)

export default productsRouter