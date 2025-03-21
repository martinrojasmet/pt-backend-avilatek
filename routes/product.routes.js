import { Router } from "express";
import authorizeAdmin from "../middlewares/admin.middleware.js";
import authorizeClient from "../middlewares/client.middleware.js";
import authorizeUser from "../middlewares/authorize.middleware.js";

const productRouter = Router();

productRouter.get('/', authorizeUser, (req, res) => {
    res.send('GET all products');
});

productRouter.get('/:id', authorizeUser, (req, res) => {
    res.send('GET product by id');
});

productRouter.post('/', authorizeUser, authorizeAdmin, (req, res) => {
    res.send('CREATE product');
});

productRouter.put('/:id', authorizeUser, authorizeAdmin, (req, res) => {
    res.send('UPDATE product');
});

productRouter.delete('/:id', authorizeUser, authorizeAdmin, (req, res) => {
    res.send('DELETE product');
});

export default productRouter;