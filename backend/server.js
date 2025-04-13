require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./src/config/db"); // assuming this connects your DB

const app = express();
const mqttRoutes = require("./src/routes/mqttRoutes");
app.use("/api/mqtt", mqttRoutes);
const influxRoutes = require("./src/routes/InfluxRoutes");
app.use("/api/influx", influxRoutes);


// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
const userRoutes = require("./src/routes/User");
const authRoutes = require("./src/routes/authRoutes");
const sensorRoutes = require("./src/routes/sensorRoutes"); // Make sure this file exists

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api/sensor", sensorRoutes);

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
