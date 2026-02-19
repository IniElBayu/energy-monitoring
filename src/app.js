require('dotenv').config();
const express = require('express');
const panelRoutes = require('./routes/panelRoutes');

require('./mqttSubscriber');

const app = express();
app.use(express.json());

// ✅ Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: "Energy Monitoring API is running",
    endpoints: [
      "/api/panel/:panelId/realtime",
      "/api/panel/:panelId/today",
      "/api/panel/:panelId/monthly?year=YYYY"
    ]
  });
});

// Panel routes
app.use('/api/panel', panelRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
