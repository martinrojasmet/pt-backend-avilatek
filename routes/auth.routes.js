import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";

const authRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

/**
 * @swagger
 * /auth/sign-up:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             name: Martin Rojas
 *             email: gabriel@gmail.com
 *             password: password123
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User created successfully
 *               data:
 *                 token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZGYyN2I2ZmNkZjY3YjQ3ZTc5NDU4OCIsImlhdCI6MTc0MjY3Nzk0MiwiZXhwIjoxNzQyNzY0MzQyfQ.NFkuHRJnV4aZj5qMfB7cYohR7bAPVNmH1Q4ZF1qJ9pw
 *                 user:
 *                   name: Martin Rojas
 *                   email: rojas1@gmail.com
 *                   password: $2b$10$9/3j.ObcTlnV99JVnGL5FuVSPOujfcDRHys7pOwHNaUWtKfWWr.di
 *                   role: client
 *                   _id: 67df27b6fcdf67b47e794588
 *                   createdAt: 2025-03-22T21:12:22.025Z
 *                   updatedAt: 2025-03-22T21:12:22.025Z
 *                   __v: 0
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: User already exists
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Error message
 */
authRouter.post('/sign-up', signUp);

/**
 * @swagger
 * /auth/sign-in:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             email: gabriel@gmail.com
 *             password: password123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User logged in successfully
 *               data:
 *                 token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZGYyN2I2ZmNkZjY3YjQ3ZTc5NDU4OCIsImlhdCI6MTc0MjY3ODQxMSwiZXhwIjoxNzQyNzY0ODExfQ.E7mVqWeEBJhoedxvlukLmbtlQ6hfPw8-iVAKsg1R7c0
 *                 user:
 *                   _id: 67df27b6fcdf67b47e794588
 *                   name: Martin Rojas
 *                   email: rojas1@gmail.com
 *                   password: $2b$10$9/3j.ObcTlnV99JVnGL5FuVSPOujfcDRHys7pOwHNaUWtKfWWr.di
 *                   role: client
 *                   createdAt: 2025-03-22T21:12:22.025Z
 *                   updatedAt: 2025-03-22T21:12:22.025Z
 *                   __v: 0
 *       401:
 *         description: Invalid password
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Invalid password
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Error message
 */
authRouter.post('/sign-in', signIn);

export default authRouter;