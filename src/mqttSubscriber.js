const mqtt = require('mqtt');
const { Point } = require('@influxdata/influxdb-client');
const { writeApi } = require('./influx');

const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
  console.log('MQTT Subscriber connected');
  client.subscribe('DATA/PM/#');
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
  } catch (err) {
    console.log('Error:', err.message);
  }
});
