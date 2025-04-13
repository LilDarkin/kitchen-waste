const express = require("express");
const mqtt = require("mqtt");

const router = express.Router();

// MQTT Setup
const broker = "mqtt://192.168.168.112:1883"; // Update this if needed
const topic_control = "sensor/control";

const client = mqtt.connect(broker);

client.on("connect", () => {
  console.log("✅ MQTT connected from backend");
});

router.post("/start", (req, res) => {
  client.publish(topic_control, "START");
  res.status(200).json({ message: "START command sent via MQTT" });
});

router.post("/stop", (req, res) => {
  client.publish(topic_control, "STOP");
  res.status(200).json({ message: "STOP command sent via MQTT" });
});

module.exports = router;
