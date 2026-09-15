import express from "express";
import { addCredits, deductCredits, login, logout } from "../controllers/auth.controller.js";
const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/logout', logout)
authRouter.post("/add-credits", addCredits);
authRouter.post("/deduct-credits", deductCredits);

export default authRouter;