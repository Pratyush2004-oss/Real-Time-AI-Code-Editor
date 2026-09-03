import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
dotenv.config();
import projectRouter from "./routes/project.route.js";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Project service is running");
});

app.use("/", projectRouter);
app.listen(process.env.AUTH_PORT, () => {
    connectDB();
    console.log(`Project service is running on port ${process.env.AUTH_PORT}`);
});