const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883');

let energy = 120; 

client.on('connect', () => {
  console.log('Publisher connected');

  setInterval(() => {
    energy += 1;

    const payload = JSON.stringify({
      energy: energy,
      power: 15,
      voltage: 220,
      current: 6
    });

    client.publish('DATA/PM/PANEL_LANTAI_1', payload);
    console.log('Data sent:', payload);

  }, 5000);
});

client.on('error', (err) => {
  console.log('MQTT Error:', err);
});
