// src/routes/tasks.js
import express from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  patchTask,
  deleteTask,
  deleteAllTasks,
} from "../controllers/tasks.controllers.js";

const router = express.Router();

// -----------------------------------------------------------
// Collection routes  →  /api/tasks
// -----------------------------------------------------------
router.get("/", getAllTasks); // GET    all tasks (+ optional ?status= ?priority= filters)
router.post("/add", createTask); // POST   create a new task
router.delete("/delete", deleteAllTasks); // DELETE wipe all tasks

// -----------------------------------------------------------
// Single-resource routes  →  /api/tasks/:id
// -----------------------------------------------------------
router.get("/:id", getTaskById); // GET    one task
router.put("/:id", updateTask); // PUT    full replace
router.patch("/:id", patchTask); // PATCH  partial update
router.delete("/:id", deleteTask); // DELETE one task

export default router;
