import express from "express";
import taskRouter from "./routes/tasks.routes.js";
import cors from "cors";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));

// cors configuration
app.use(
  cors({
    origin: "http://localhost5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"],
  }),
);

app.use("/tasks", taskRouter);

export default app;
