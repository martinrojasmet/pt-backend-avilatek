import { Router } from "express";
import authorizeAdmin from "../middlewares/admin.middleware.js";
import authorizeClient from "../middlewares/client.middleware.js";
import authorizeUser from "../middlewares/authorize.middleware.js";
import authorizeOrder from "../middlewares/order.middleware.js";
import { createOrder, deleteOrder, getAllOrders, getOrder, updateOrder, cancelOrder, confirmOrder, getAllOrdersUser } from "../controllers/order.controller.js";

const orderRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Orders routes
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - _id: 67defd2d70034e33a4ab9624
 *                   user: 67ddafe6f43a56996d1c2fd6
 *                   items:
 *                     - product: 67ddcf2ddd99db2534b09b2b
 *                       quantity: 6
 *                   status: Cancelled
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Unauthorized
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Error message
 */
orderRouter.get('/', authorizeUser, authorizeAdmin, getAllOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: An order object
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 _id: 67defd2d70034e33a4ab9624
 *                 user: 67ddafe6f43a56996d1c2fd6
 *                 items:
 *                   - product: 67ddcf2ddd99db2534b09b2b
 *                     quantity: 6
 *                 status: Cancelled
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Unauthorized
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Order not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Error message
 */
orderRouter.get('/:id', authorizeUser, authorizeOrder, getOrder);

/**
 * @swagger
 * /orders/user/{id}:
 *   get:
 *     summary: Get all orders for a user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A list of orders for a user
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - _id: 67defd2d70034e33a4ab9624
 *                   user: 67ddafe6f43a56996d1c2fd6
 *                   items:
 *                     - product: 67ddcf2ddd99db2534b09b2b
 *                       quantity: 6
 *                   status: Cancelled
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Unauthorized
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Order not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Error message
 */
orderRouter.get('/user/:id', authorizeUser, authorizeClient, getAllOrdersUser);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                     quantity:
 *                       type: number
 *           example:
 *             items:
 *               - product: 67ddcf78dd99db2534b09b33
 *                 quantity: 21
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Order created successfully
 *               data:
 *                 user: 67ddb76d2cbcd08d030e8d3d
 *                 items:
 *                   - product: 67ddcf78dd99db2534b09b33
 *                     quantity: 21
 *                 status: Pending
 *                 _id: 67df3cf892e5662ddf469cb7
 *                 createdAt: 2025-03-22T22:43:04.973Z
 *                 updatedAt: 2025-03-22T22:43:04.973Z
 *                 __v: 0
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Unauthorized
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Error message
 */
orderRouter.post('/', authorizeUser, createOrder);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update an order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                     quantity:
 *                       type: number
 *           example:
 *             items:
 *               - product: 67ddcf78dd99db2534b09b33
 *                 quantity: 21
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Order updated successfully
 *               data:
 *                 user: 67ddb76d2cbcd08d030e8d3d
 *                 items:
 *                   - product: 67ddcf78dd99db2534b09b33
 *                     quantity: 21
 *                 status: Pending
 *                 _id: 67df3cf892e5662ddf469cb7
 *                 createdAt: 2025-03-22T22:43:04.973Z
 *                 updatedAt: 2025-03-22T22:43:04.973Z
 *                 __v: 0
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Unauthorized
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Order not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Error message
 */
orderRouter.put('/:id', authorizeUser, authorizeAdmin, updateOrder);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Order deleted successfully
 *               data:
 *                 _id: 67df3cf892e5662ddf469cb7
 *                 user: 67ddb76d2cbcd08d030e8d3d
 *                 items:
 *                   - product: 67ddcf78dd99db2534b09b33
 *                     quantity: 21
 *                 status: Cancelled
 *                 createdAt: 2025-03-22T22:43:04.973Z
 *                 updatedAt: 2025-03-22T22:44:00.481Z
 *                 __v: 0
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Unauthorized
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Order not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Error message
 */
orderRouter.delete('/:id', authorizeUser, deleteOrder);

/**
 * @swagger
 * /orders/cancel/{id}:
 *   post:
 *     summary: Cancel an order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Order cancelled successfully
 *               data:
 *                 _id: 67df3cf892e5662ddf469cb7
 *                 user: 67ddb76d2cbcd08d030e8d3d
 *                 items:
 *                   - product: 67ddcf78dd99db2534b09b33
 *                     quantity: 21
 *                 status: Cancelled
 *                 createdAt: 2025-03-22T22:43:04.973Z
 *                 updatedAt: 2025-03-22T22:44:00.481Z
 *                 __v: 0
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Unauthorized
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Order not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Error message
 */
orderRouter.post('/cancel/:id', authorizeUser, authorizeOrder, cancelOrder);

/**
 * @swagger
 * /orders/confirm/{id}:
 *   post:
 *     summary: Confirm an order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Order confirmed successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Order confirmed successfully
 *               data:
 *                 _id: 67df3cf892e5662ddf469cb7
 *                 user: 67ddb76d2cbcd08d030e8d3d
 *                 items:
 *                   - product: 67ddcf78dd99db2534b09b33
 *                     quantity: 21
 *                 status: Confirmed
 *                 createdAt: 2025-03-22T22:43:04.973Z
 *                 updatedAt: 2025-03-22T22:44:00.481Z
 *                 __v: 0
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Unauthorized
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Order not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Error message
 */
orderRouter.post('/confirm/:id', authorizeUser, authorizeAdmin, confirmOrder);


export default orderRouter;