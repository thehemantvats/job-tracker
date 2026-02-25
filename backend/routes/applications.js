const express = require("express");
const router = express.Router();

let applications = [];

// GET all applications
router.get("/", (_req, res) => {
  res.json(applications);
});

// POST create application
router.post("/", (req, res) => {
  const { company, role, status, resumeId } = req.body;

  if (!company || !role) {
    return res.status(400).json({ error: "Company and role are required" });
  }

  const newApp = {
    id: Date.now(),
    company,
    role,
    status: status || "Applied",
    resumeId: resumeId || "",
  };

  applications.push(newApp);
  res.status(201).json(newApp);
});

// PUT update application
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = applications.findIndex((app) => app.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Application not found" });
  }

  applications[index] = { ...applications[index], ...req.body };
  res.json(applications[index]);
});

// DELETE application
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = applications.findIndex((app) => app.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Application not found" });
  }

  applications.splice(index, 1);
  res.json({ message: "Deleted" });
});

module.exports = router;
