import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
dotenv.config();
import authRouter from "./routes/auth.route.js";
const app = express();

app.use(express.json());

app.use("/", authRouter);
app.listen(process.env.AUTH_PORT, () => {
    connectDB();
    console.log(`Auth service is running on port ${process.env.AUTH_PORT}`);
});