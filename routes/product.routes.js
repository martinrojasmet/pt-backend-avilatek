import { Router } from "express";
import authorizeAdmin from "../middlewares/admin.middleware.js";
import authorizeClient from "../middlewares/client.middleware.js";
import authorizeUser from "../middlewares/authorize.middleware.js";
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/product.controller.js";

const productRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product routes
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
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - _id: 67ddcf2ddd99db2534b09b2b
 *                   name: Mango
 *                   description: Yellow fruit
 *                   price: 12.32
 *                   stock: 56
 *                 - _id: 67ddcf60dd99db2534b09b2f
 *                   name: Apple
 *                   description: Red fruit
 *                   price: 6
 *                   stock: 12
 *                 - _id: 67ddcf78dd99db2534b09b33
 *                   name: Pear
 *                   description: Green fruit
 *                   price: 87.2
 *                   stock: 90
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
productRouter.get('/', authorizeUser, getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: A product object
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 _id: 67ddcf2ddd99db2534b09b2b
 *                 name: Mango
 *                 description: Yellow fruit
 *                 price: 12.32
 *                 stock: 56
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Unauthorized
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Product not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Error message
 */
productRouter.get('/:id', authorizeUser, getProduct);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *           example:
 *             name: Pineapple
 *             description: Yellow and spiky fruit
 *             price: 2.00
 *             stock: 4
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Product created successfully
 *               data:
 *                 name: Orange
 *                 description: Orange fruit
 *                 price: 80
 *                 stock: 35
 *                 _id: 67df34b1e9db8ad97dd69cdd
 *                 createdAt: 2025-03-22T22:07:45.741Z
 *                 updatedAt: 2025-03-22T22:07:45.741Z
 *                 __v: 0
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Unauthorized
 *       409:
 *         description: Product already exists
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Product already exists
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Error message
 */
productRouter.post('/', authorizeUser, authorizeAdmin, createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *           example:
 *             name: Pineapple
 *             description: Yellow and spiky fruit
 *             price: 2.00
 *             stock: 4
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Product updated successfully
 *               data:
 *                 name: Orange
 *                 description: Orange fruit
 *                 price: 80
 *                 stock: 35
 *                 _id: 67df34b1e9db8ad97dd69cdd
 *                 createdAt: 2025-03-22T22:07:45.741Z
 *                 updatedAt: 2025-03-22T22:07:45.741Z
 *                 __v: 0
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Unauthorized
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Product not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Error message
 */
productRouter.put('/:id', authorizeUser, authorizeAdmin, updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Product deleted successfully
 *               data:
 *                 _id: 67df34b1e9db8ad97dd69cdd
 *                 name: Orange
 *                 description: Orange fruit
 *                 price: 80
 *                 stock: 35
 *                 createdAt: 2025-03-22T22:07:45.741Z
 *                 updatedAt: 2025-03-22T22:07:45.741Z
 *                 __v: 0
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Unauthorized
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Product not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Error message
 */
productRouter.delete('/:id', authorizeUser, authorizeAdmin, deleteProduct);

export default productRouter;