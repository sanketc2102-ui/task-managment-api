import { Router } from "express";
import {
  createTask,
  deleteTask,
  updateTask,
  getAllTasks,
} from "../controllers/tasks.controllers.js";

const router = Router();

router.post("/", createTask);

router.get("/", getAllTasks);

router.delete("/:id", deleteTask);

router.put("/:id", updateTask);

export default router;
