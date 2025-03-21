import { Router } from "express";
import authorizeAdmin from "../middlewares/admin.middleware.js";
import authorizeClient from "../middlewares/client.middleware.js";
import authorizeUser from "../middlewares/authorize.middleware.js";
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.get('/', authorizeUser, getAllProducts);

productRouter.get('/:id', authorizeUser, getProduct);

productRouter.post('/', authorizeUser, authorizeAdmin, createProduct);

productRouter.put('/:id', authorizeUser, authorizeAdmin, updateProduct);

productRouter.delete('/:id', authorizeUser, deleteProduct);

export default productRouter;