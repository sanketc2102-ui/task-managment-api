import { Router } from "express";
import {
  createTask,
  deleteTask,
  updateTask,
} from "../controllers/tasks.controllers";

const router = Router();

router.post("/tasks", createTask);

router.get("/tasks", getAllTask);

router.delete("/tasks/:id", deleteTask);

router.put("/tasks/:id", updateTask);

export default router;
