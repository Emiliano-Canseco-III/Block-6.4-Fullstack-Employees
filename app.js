import express from "express";
import employeesRouter from "./api/employees.js";

const app = express();
app.use(express.json());

// Root route for testing server availability
app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

// Mount employees API
app.use("/employees", employeesRouter);

// GET /employees
router.get("/", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM employees");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to fetch employees" });
  }
});

// POST /employees
router.post("/", async (req, res) => {
  const body = req.body;
  if (!body) return res.status(400).send();
  const { name, birthday, salary } = body;
  if (!name || !birthday || typeof salary !== "number")
    return res.status(400).send();

  try {
    const sql = `
      INSERT INTO employees (name, birthday, salary)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const { rows } = await db.query(sql, [name, birthday, salary]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to create employee" });
  }
});

// GET /employees/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!isPositiveIntString(id)) return res.status(400).send();

  try {
    const { rows } = await db.query("SELECT * FROM employees WHERE id = $1", [
      id,
    ]);
    if (rows.length === 0) return res.status(404).send();
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to fetch employee" });
  }
});

// DELETE /employees/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!isPositiveIntString(id)) return res.status(400).send();

  try {
    const { rows } = await db.query(
      "DELETE FROM employees WHERE id = $1 RETURNING *",
      [id]
    );
    if (rows.length === 0) return res.status(404).send();
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to delete employee" });
  }
});

// PUT /employees/:id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  if (!body) return res.status(400).send();
  const { name, birthday, salary } = body;
  if (!name || !birthday || typeof salary !== "number")
    return res.status(400).send();
  if (!isPositiveIntString(id)) return res.status(400).send();

  try {
    const sql = `
      UPDATE employees
      SET name = $1, birthday = $2, salary = $3
      WHERE id = $4
      RETURNING *;
    `;
    const { rows } = await db.query(sql, [name, birthday, salary, id]);
    if (rows.length === 0) return res.status(404).send();
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to update employee" });
  }
});

export default router;
