# Energy Monitoring Backend

Node.js • MQTT • InfluxDB • Express


Energy Monitoring System
Overview

Backend system untuk monitoring konsumsi listrik menggunakan:

MQTT (data ingestion)

InfluxDB (time-series database)

Express.js (REST API)

Architecture

MQTT Publisher → MQTT Broker → Node.js Subscriber → InfluxDB → REST API → Client

Installation :
 1. npm install
 2. Buat file .env
 INFLUX_URL=http://localhost:8086
 INFLUX_TOKEN=RPHvZpt8NXSRkwhwvPzn7UfBtZBXCvPER_XKli2F5IQ8nKm4px8vDiLhW0WaTvGc7mFARMFQJqfm6ovdGGkQPQ==
 INFLUX_ORG=ravelware
 INFLUX_BUCKET=energy_monitoring
 3. Run Application
 node src/app.js
 4. Server akan berjalan di:
 http://localhost:3000
 
 API Endpoints
 Realtime Data

 GET
 /api/panel/:panelId/realtime

 Today Usage
 GET
 /api/panel/:panelId/today

 Monthly Usage
 GET
 /api/panel/:panelId/monthly?year=2026
