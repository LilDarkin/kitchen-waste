// src/config/influxClient.js
const { InfluxDB } = require('@influxdata/influxdb-client');

const url = 'http://192.168.165.112:8086'; // Your InfluxDB URL
const token = '3XqQTCGId3fB9oe9jj_CzSVk0HH0JneU1oAGnoGNQFHkr1B8Vrxir8ppLZTcobiXaB5ElKiY9ciSV_6NxrZB1Q=='; // Replace with your actual token
const org = 'Tokiya_Kokak_Vikki'; // Your org name
const bucket = 'nutricycleBucket'; // Your bucket

const client = new InfluxDB({ url, token });

module.exports = {
  queryApi: client.getQueryApi(org),
  bucket,
};
