const express = require("express");

const router = express.Router();

let semaphore = 3;
let resources = 3;

let processes = [
  { id: "P1", status: "Idle" },
  { id: "P2", status: "Idle" },
  { id: "P3", status: "Idle" },
  { id: "P4", status: "Idle" },
  { id: "P5", status: "Idle" }
];

let waitingQueue = [];

router.get("/status", (req, res) => {
  res.json({
    semaphore,
    resources,
    waitingQueue,
    processes
  });
});

router.post("/wait", (req, res) => {
  const { processId } = req.body;

  const process = processes.find(p => p.id === processId);

  if (!process)
    return res.status(404).json({ message: "Process not found" });

  if (process.status === "Running")
    return res.json({
      semaphore,
      resources,
      waitingQueue,
      processes
    });

  if (semaphore > 0) {
    semaphore--;
    resources--;

    process.status = "Running";
  } else {
    process.status = "Waiting";

    if (!waitingQueue.includes(processId))
      waitingQueue.push(processId);
  }

  res.json({
    semaphore,
    resources,
    waitingQueue,
    processes
  });
});

router.post("/signal", (req, res) => {

  const { processId } = req.body;

  const process = processes.find(p => p.id === processId);

  if (process && process.status === "Running") {
    process.status = "Idle";

    semaphore++;
    resources++;

    if (waitingQueue.length > 0) {

      const next = waitingQueue.shift();

      const p = processes.find(x => x.id === next);

      p.status = "Running";

      semaphore--;
      resources--;
    }
  }

  res.json({
    semaphore,
    resources,
    waitingQueue,
    processes
  });
});

router.post("/reset", (req, res) => {

  semaphore = 3;
  resources = 3;

  waitingQueue = [];

  processes.forEach(p => p.status = "Idle");

  res.json({
    semaphore,
    resources,
    waitingQueue,
    processes
  });

});

module.exports = router;