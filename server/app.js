// Importing all necessary packages
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import * as dotenv from "dotenv";
dotenv.config();

// Import routers and middlewares
import authRouter from "./router/authRouter.js";
import userRouter from "./router/userRouter.js";
import examRouter from "./router/examRouter.js";
import courseRouter from "./router/courseRouter.js";
import internshipRouter from "./router/internRouter.js";
import scholarshipRouter from "./router/scholarRouter.js";
import eventRouter from "./router/eventRouter.js";
import generalInfoRouter from "./router/genralRouter.js";
import onDutyFormRouter from "./router/onDutyRouter.js";

// Default export
const app = express();
const port = 3333;


// Use express.json() instead of bodyParser.json()
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/dashboard-student/current-user", userRouter);

// Admin functionalities
app.use("/api/v1/admin/exams", examRouter); // Exam timetable routes
app.use("/api/v1/admin/courses", courseRouter); // Courses routes
app.use("/api/v1/admin/internships", internshipRouter); // Internship routes
app.use("/api/v1/admin/scholarships", scholarshipRouter); // Scholarship routes
app.use("/api/v1/admin/events", eventRouter); // Events routes
app.use("/api/v1/admin/general-info", generalInfoRouter); // General information routes
app.use("/api/v1/student/on-duty", onDutyFormRouter);

// Error handling routes
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

// Listen on port and connect to MongoDB
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
