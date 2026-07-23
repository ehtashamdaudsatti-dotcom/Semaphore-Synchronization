const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Semaphore Synchronization Backend Running 🚀"
  });
});

// API Routes
app.use("/api/semaphore", require("./routes/semaphore"));

module.exports = app;