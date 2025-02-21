const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

router.get("/", (req, res) => {
  Todo.getAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ error: "Task is required" });

  Todo.create(task, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: result.insertId, task });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Todo.delete(id, (err) => {
    if (err) return res.status(500).send(err);
    res.status(200).json({ message: "Task deleted" });
  });
});

module.exports = router;
