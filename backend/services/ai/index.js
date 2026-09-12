import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
dotenv.config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("AI service is running");
});

app.listen(process.env.FILE_PORT, () => {
    connectDB();
    console.log(`AI service is running on port ${process.env.AI_PORT}`);
});