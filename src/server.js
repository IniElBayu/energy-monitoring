require('dotenv').config();
const mqtt = require('mqtt');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');

const client = mqtt.connect('mqtt://localhost:1883');

const influxDB = new InfluxDB({
  url: process.env.INFLUX_URL,
  token: process.env.INFLUX_TOKEN
});

const writeApi = influxDB.getWriteApi(
  process.env.INFLUX_ORG,
  process.env.INFLUX_BUCKET
);

client.on('connect', () => {
  console.log('Subscriber connected to broker');
  client.subscribe('DATA/PM/#', (err) => {
    if (err) {
      console.log('Subscribe error:', err);
    } else {
      console.log('Subscribed to topic');
    }
  });
});

client.on('message', (topic, message) => {
  try {
    const data = JSON.parse(message.toString());

    const point = new Point('energy_data')
      .tag('panel', topic)
      .floatField('energy', parseFloat(data.energy))
      .floatField('power', parseFloat(data.power))
      .floatField('voltage', parseFloat(data.voltage))
      .floatField('current', parseFloat(data.current));

    writeApi.writePoint(point);
    writeApi.flush();

    console.log('Saved to InfluxDB:', topic);
  } catch (error) {
    console.log('Error parsing message:', error.message);
  }
});

client.on('error', (err) => {
  console.log('MQTT Error:', err);
});
