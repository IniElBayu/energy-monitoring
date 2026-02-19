const { queryApi } = require('../influx');

async function getRealtime(panelId) {
  const fluxQuery = `
    from(bucket: "${process.env.INFLUX_BUCKET}")
      |> range(start: -5m)
      |> filter(fn: (r) => r._measurement == "energy_data")
      |> filter(fn: (r) => r.panel == "DATA/PM/${panelId}")
      |> last()
  `;

  const data = await queryApi.collectRows(fluxQuery);

  if (data.length === 0) {
    return { panel: panelId, status: "OFFLINE" };
  }

  const result = {};
  data.forEach(row => {
    result[row._field] = row._value;
  });

  return {
    panel: panelId,
    ...result,
    status: "ONLINE"
  };
}

module.exports = {
  getRealtime
};
