import { Router } from "express";
import { signIn, signUp, signOut } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.get('/sign-up', signUp);
authRouter.get('/sign-in', signIn);
authRouter.get('/sign-out', signOut);

export default authRouter;