// src/routes/sensorRoutes.js
const express = require("express");
const router = express.Router();
const { sendControlCommand } = require("../config/mqttClient");

const { queryApi, bucket } = require("../config/influxClient");

router.get("/data", async (req, res) => {
  const fluxQuery = `
    from(bucket: "${bucket}")
      |> range(start: -5m)
      |> filter(fn: (r) => r._measurement == "sensor_readings")
      |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
      |> sort(columns: ["_time"], desc: true)
      |> limit(n: 1)
  `;

  let rows = [];

  try {
    await queryApi.collectRows(fluxQuery, {
      next(row) {
        rows.push(row);
      },
      error(error) {
        console.error("❌ InfluxDB Query Error", error);
        res.status(500).json({ error: "Failed to fetch sensor data" });
      },
      complete() {
        res.json(rows.length > 0 ? rows[0] : {});
      },
    });
  } catch (err) {
    console.error("⚠️ Error in route:", err);
    res.status(500).json({ error: "Unexpected error" });
  }
});


router.post("/control", (req, res) => {
  const { command } = req.body;

  if (command !== "START" && command !== "STOP") {
    return res.status(400).json({ message: "Invalid command" });
  }

  sendControlCommand(command);
  res.json({ message: `Command ${command} sent` });
});

module.exports = router;
