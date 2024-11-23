import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
dotenv.config();
import router from "./routes/index.js";
import cronJobInitial from "./config/cronJobInitial.js";

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Các phương thức cho phép
    allowedHeaders: ['Content-Type', 'Authorization'], //
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());

// connect db
connectDB();

cronJobInitial();

app.use("/api", router);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));
