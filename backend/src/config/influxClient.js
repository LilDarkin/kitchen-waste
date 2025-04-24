// src/config/influxClient.js
const { InfluxDB } = require('@influxdata/influxdb-client');

const url = 'http://192.168.76.112:8086'; // Your InfluxDB URL
const token = 'S7bJY5iqVeLX_jxjWMZurMssteAwJukWFIADtSY6yHWJchUORHKX_2pr47_M5QJOmjCWlhvUzrkMzCA7NYE2CQ=='; // Replace with your actual token
const org = 'tokiyavikkikokak'; // Your org name
const bucket = 'toki'; // Your bucket

const client = new InfluxDB({ url, token });

module.exports = {
  queryApi: client.getQueryApi(org),
  bucket,
};
