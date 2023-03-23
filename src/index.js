import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRouter from "./routes/authRoute";
import applicationRouter from './routes/applicationRoutes'
dotenv.config();


const app = express();
const PORT = process.env.PORT || 8081;
connectDB();

app.use(express.json());


// Mount the user router to the /api/v1 path
app.use('/api/v1', userRouter);

// Mount the user router to the /api/v1 path
app.use('/api/v1', applicationRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})