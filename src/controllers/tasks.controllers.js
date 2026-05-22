// src/controllers/tasksController.js
// -----------------------------------------------------------
// In-memory data store (replace with DB calls later)
// -----------------------------------------------------------

let tasks = [
  {
    id: 1,
    title: "Design login and signup flow",
    description: "Prepare the first pass of authentication screens.",
    dueDate: "2026-05-18",
    priority: "high",
    status: "in_progress",
  },
  {
    id: 2,
    title: "Connect task API",
    description: "Replace sample task data with backend calls.",
    dueDate: "2026-05-22",
    priority: "medium",
    status: "todo",
  },
  {
    id: 3,
    title: "Review dashboard spacing",
    description: "Check cards, filters, and mobile breakpoints.",
    dueDate: "2026-05-25",
    priority: "low",
    status: "done",
  },
];

// Auto-increment counter (mimics DB serial IDs)
let nextId = tasks.length + 1;

// -----------------------------------------------------------
// Allowed values for validation
// -----------------------------------------------------------
const VALID_STATUSES = ["todo", "in_progress", "done"];
const VALID_PRIORITIES = ["low", "medium", "high"];

// -----------------------------------------------------------
// Helper: find a task by id or return 404
// -----------------------------------------------------------
function findTask(id) {
  return tasks.find((t) => t.id === Number(id));
}

// -----------------------------------------------------------
// GET /tasks
// Query params: status, priority (optional filters)
// -----------------------------------------------------------
const getAllTasks = (req, res) => {
  const { status, priority } = req.query;

  let result = [...tasks];

  if (status) {
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed: ${VALID_STATUSES.join(", ")}`,
      });
    }
    result = result.filter((t) => t.status === status);
  }

  if (priority) {
    if (!VALID_PRIORITIES.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: `Invalid priority. Allowed: ${VALID_PRIORITIES.join(", ")}`,
      });
    }
    result = result.filter((t) => t.priority === priority);
  }

  return res.status(200).json({
    success: true,
    count: result.length,
    data: result,
  });
};

// -----------------------------------------------------------
// GET /tasks/:id
// -----------------------------------------------------------
const getTaskById = (req, res) => {
  const task = findTask(req.params.id);

  if (!task) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }

  return res.status(200).json({ success: true, data: task });
};

// -----------------------------------------------------------
// POST /tasks
// Body: { title, description, dueDate, priority, status }
// -----------------------------------------------------------
const createTask = (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;

  // --- Validation ---
  if (!title || typeof title !== "string" || title.trim() === "") {
    return res
      .status(400)
      .json({
        success: false,
        message: "title is required and must be a non-empty string",
      });
  }

  if (priority && !VALID_PRIORITIES.includes(priority)) {
    return res.status(400).json({
      success: false,
      message: `Invalid priority. Allowed: ${VALID_PRIORITIES.join(", ")}`,
    });
  }

  if (status && !VALID_STATUSES.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Invalid status. Allowed: ${VALID_STATUSES.join(", ")}`,
    });
  }

  if (dueDate && isNaN(Date.parse(dueDate))) {
    return res
      .status(400)
      .json({
        success: false,
        message: "dueDate must be a valid date string (e.g. YYYY-MM-DD)",
      });
  }

  // --- Create ---
  const newTask = {
    id: nextId++,
    title: title.trim(),
    description: description?.trim() ?? "",
    dueDate: dueDate ?? null,
    priority: priority ?? "medium",
    status: status ?? "todo",
  };

  tasks.push(newTask);

  return res.status(201).json({ success: true, data: newTask });
};

// -----------------------------------------------------------
// PUT /tasks/:id  — full replace
// Body: { title, description, dueDate, priority, status }
// -----------------------------------------------------------
const updateTask = (req, res) => {
  const task = findTask(req.params.id);

  if (!task) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }

  const { title, description, dueDate, priority, status } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res
      .status(400)
      .json({
        success: false,
        message: "title is required and must be a non-empty string",
      });
  }

  if (priority && !VALID_PRIORITIES.includes(priority)) {
    return res.status(400).json({
      success: false,
      message: `Invalid priority. Allowed: ${VALID_PRIORITIES.join(", ")}`,
    });
  }

  if (status && !VALID_STATUSES.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Invalid status. Allowed: ${VALID_STATUSES.join(", ")}`,
    });
  }

  if (dueDate && isNaN(Date.parse(dueDate))) {
    return res
      .status(400)
      .json({
        success: false,
        message: "dueDate must be a valid date string (e.g. YYYY-MM-DD)",
      });
  }

  // Full replace (keep same id)
  task.title = title.trim();
  task.description = description?.trim() ?? "";
  task.dueDate = dueDate ?? null;
  task.priority = priority ?? "medium";
  task.status = status ?? "todo";

  return res.status(200).json({ success: true, data: task });
};

// -----------------------------------------------------------
// PATCH /tasks/:id  — partial update
// Body: any subset of { title, description, dueDate, priority, status }
// -----------------------------------------------------------
const patchTask = (req, res) => {
  const task = findTask(req.params.id);

  if (!task) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }

  const { title, description, dueDate, priority, status } = req.body;

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "title must be a non-empty string" });
    }
    task.title = title.trim();
  }

  if (description !== undefined) {
    task.description = description.trim();
  }

  if (dueDate !== undefined) {
    if (isNaN(Date.parse(dueDate))) {
      return res
        .status(400)
        .json({
          success: false,
          message: "dueDate must be a valid date string (e.g. YYYY-MM-DD)",
        });
    }
    task.dueDate = dueDate;
  }

  if (priority !== undefined) {
    if (!VALID_PRIORITIES.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: `Invalid priority. Allowed: ${VALID_PRIORITIES.join(", ")}`,
      });
    }
    task.priority = priority;
  }

  if (status !== undefined) {
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed: ${VALID_STATUSES.join(", ")}`,
      });
    }
    task.status = status;
  }

  return res.status(200).json({ success: true, data: task });
};

// -----------------------------------------------------------
// DELETE /tasks/:id
// -----------------------------------------------------------
const deleteTask = (req, res) => {
  const index = tasks.findIndex((t) => t.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }

  const [deleted] = tasks.splice(index, 1);

  return res.status(200).json({ success: true, data: deleted });
};

// -----------------------------------------------------------
// DELETE /tasks  — wipe all tasks (useful for testing)
// -----------------------------------------------------------
const deleteAllTasks = (_req, res) => {
  tasks = [];
  return res.status(200).json({ success: true, message: "All tasks deleted" });
};

export {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  patchTask,
  deleteTask,
  deleteAllTasks,
};
