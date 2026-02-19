const express = require('express');
const router = express.Router();
const panelService = require('../services/panelService');

router.get('/:panelId/realtime', async (req, res) => {
  try {
    const result = await panelService.getRealtime(req.params.panelId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
