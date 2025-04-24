const express = require("express");
const { InfluxDB } = require("@influxdata/influxdb-client");

const router = express.Router();

// Replace these with your actual InfluxDB settings
const url = "http://192.168.76.112:8086";
const token = "S7bJY5iqVeLX_jxjWMZurMssteAwJukWFIADtSY6yHWJchUORHKX_2pr47_M5QJOmjCWlhvUzrkMzCA7NYE2CQ==";
const org = "tokiyavikkikokak";
const bucket = "toki";

const influxDB = new InfluxDB({ url, token });
const queryApi = influxDB.getQueryApi(org);

router.get("/latest", async (req, res) => {
  try {
    const query = `
      from(bucket: "${bucket}")
        |> range(start: -5m)
        |> filter(fn: (r) => r._measurement == "sensor_readings")
        |> sort(columns: ["_time"], desc: true)
        |> limit(n:1)
    `;

    const data = [];
    queryApi.queryRows(query, {
      next(row, tableMeta) {
        const obj = tableMeta.toObject(row);
        data.push(obj);
      },
      error(error) {
        console.error("❌ InfluxDB query error:", error);
        res.status(500).json({ error: "InfluxDB query failed" });
      },
      complete() {
        const latest = data.reduce((acc, curr) => {
          acc[curr._field] = curr._value;
          return acc;
        }, {});
        res.status(200).json(latest);
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
