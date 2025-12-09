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

export default app;
