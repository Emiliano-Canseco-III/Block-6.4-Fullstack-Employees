import express from "express";
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "#db/queries/employees";

const router = express.Router();

function isPositiveIntString(s) {
  return /^\d+$/.test(s) && Number(s) > 0;
}

router.get("/", async (req, res) => {
  try {
    const rows = await getEmployees();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to fetch employees" });
  }
});

router.post("/", async (req, res) => {
  if (typeof req.body === "undefined") return res.status(400).send();
  const { name, birthday, salary } = req.body;
  if (!name || !birthday || typeof salary !== "number")
    return res.status(400).send();
  try {
    const created = await createEmployee({ name, birthday, salary });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to create employee" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!isPositiveIntString(id)) return res.status(400).send();
  try {
    const row = await getEmployee(id);
    if (!row) return res.status(404).send();
    res.json(row);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to fetch employee" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!isPositiveIntString(id)) return res.status(400).send();
  try {
    const deleted = await deleteEmployee(id);
    if (!deleted) return res.status(404).send();
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to delete employee" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (typeof req.body === "undefined") return res.status(400).send();
  const { name, birthday, salary } = req.body;
  if (!name || !birthday || typeof salary !== "number")
    return res.status(400).send();
  if (!isPositiveIntString(id)) return res.status(400).send();
  try {
    const updated = await updateEmployee({ id, name, birthday, salary });
    if (!updated) return res.status(404).send();
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to update employee" });
  }
});

export default router;
