// src/config/mqttClient.js
const mqtt = require("mqtt");

const broker = "mqtt://192.168.76.112:1883";
const topic = "sensor/control";

const client = mqtt.connect(broker);

client.on("connect", () => {
  console.log("✅ Connected to MQTT broker");
});

const sendControlCommand = (command) => {
  if (client.connected) {
    client.publish(topic, command);
    console.log(`📤 Published command: ${command}`);
  }
};

module.exports = {
  sendControlCommand,
};
