import db from "../db/dbConnection.js";

/* {
  "user_id": 1,
  "title": "Learn Express Routes",
  "description": "Understand how routes connect to controllers",
  "priority": "high",
  "status": "todo",
  "due_date": "2026-05-25 18:00:00"
} */

const createTask = async (req, res) => {
  try {
    const { user_id, title, description, priority, status, due_date } =
      req.body;

    const query = `
      INSERT INTO tasks
      (user_id, title, description, priority, status, due_date)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [user_id, title, description, priority, status, due_date];

    const [result] = await db.query(query, values);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      taskId: result.insertId,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const [tasks] = await db.query(`
      SELECT * FROM tasks
    `);

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, priority, status, due_date } = req.body;

    const query = `
      UPDATE tasks
      SET
        title = ?,
        description = ?,
        priority = ?,
        status = ?,
        due_date = ?
      WHERE id = ?
    `;

    const values = [title, description, priority, status, due_date, id];

    const [result] = await db.query(query, values);

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      result,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      DELETE FROM tasks
      WHERE id = ?
    `;

    const [result] = await db.query(query, [id]);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export { createTask, updateTask, deleteTask, getAllTasks };
