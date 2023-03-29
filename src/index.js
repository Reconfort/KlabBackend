import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./config/db";
import userRouter from "./routes/authRoute";
import applicationRouter from "./routes/applicationRoutes";
import eventRouter from "./routes/eventRoute";
import programRouter from "./routes/programsRouter";
import teamRouter from "./routes/teamRouter";
import contactRouter from "./routes/contactRouter";
import partnerRouter from "./routes/partnerRoutes";
import parentRoute from "./routes/parentRouter";

import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;
connectDB();

app.use(express.json());
app.use(cors());

// Mount the user router to the /api/v1 path
app.use("/api/v1", userRouter);

// Mount the application router to the /api/v1 path
app.use("/api/v1", applicationRouter);

// Mount the events router to the /api/v1 path
app.use("/api/v1", eventRouter);

// Mount the program router to the /api/v1 path
app.use("/api/v1", programRouter);

// Mount the Child router to the /api/v1 path
app.use("/api/v1", parentRoute);

// Mount the team router to the /api/v1 path
app.use("/api/v1", teamRouter);

// Mount the contact router to the /api/v1 path
app.use("/api/v1", contactRouter);

// Mount the contact router to the /api/v1 path
app.use("/api/v1", partnerRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
