const express = require("express");
const router = express.Router();

let resumes = [];

// GET all resumes
router.get("/", (_req, res) => {
  res.json(resumes);
});

// POST create resume
router.post("/", (req, res) => {
  const { name, text } = req.body;

  if (!name || !text) {
    return res.status(400).json({ error: "Name and text are required" });
  }

  const newResume = {
    id: Date.now(),
    name,
    text,
  };

  resumes.push(newResume);
  res.status(201).json(newResume);
});

// DELETE resume
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = resumes.findIndex((r) => r.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Resume not found" });
  }

  resumes.splice(index, 1);
  res.json({ message: "Deleted" });
});

module.exports = router;
