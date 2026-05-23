import { Router } from "express";
import {
  createTask,
  deleteTask,
  updateTask,
} from "../controllers/tasks.controllers";

const router = Router();

router.post("/", createTask);

router.get("/", getAllTask);

router.delete("/:id", deleteTask);

router.put("/:id", updateTask);

export default router;
