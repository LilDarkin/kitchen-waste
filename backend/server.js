require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./src/config/db");
const app = express();

// Routes
const userRoutes = require("./src/routes/User");

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api", userRoutes);

const PORT = process.env.PORT || 7071;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
