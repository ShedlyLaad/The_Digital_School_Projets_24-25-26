import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoute.js";
import excelDataRoutes from "./routes/excelDataRoute.js";

dotenv.config();
const app = express();

connectDB();
app.use(cors()); 
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use("/api/users", userRoutes);
app.use("/api/data", excelDataRoutes);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
