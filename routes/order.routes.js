import { Router } from "express";
import authorizeAdmin from "../middlewares/admin.middleware.js";
import authorizeClient from "../middlewares/client.middleware.js";
import authorizeUser from "../middlewares/authorize.middleware.js";
import authorizeOrder from "../middlewares/order.middleware.js";
import { createOrder, deleteOrder, getAllOrders, getOrder, updateOrder, cancelOrder, confirmOrder } from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.get('/', authorizeUser, authorizeAdmin, getAllOrders);

orderRouter.get('/:id', authorizeUser, authorizeOrder, getOrder);

orderRouter.post('/', authorizeUser, createOrder);

orderRouter.put('/:id', authorizeUser, authorizeAdmin, updateOrder);

orderRouter.delete('/:id', authorizeUser, deleteOrder);

orderRouter.post('/cancel/:id', authorizeUser, authorizeOrder, cancelOrder);

orderRouter.post('/confirm/:id', authorizeUser, authorizeAdmin, confirmOrder);


export default orderRouter;