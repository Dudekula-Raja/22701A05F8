const express = require('express');
const router = express.Router();
const urlService = require('../services/urlService');
const validateInput = require('../middleware/validateInput');
const logger = require('../config/logger');

router.post('/', validateInput, async (req, res) => {
  try {
    const { url, validity, shortcode } = req.body;
    const result = await urlService.createShortURL(url, validity, shortcode);
    logger.info(`Short URL created: ${result.shortLink}`);
    res.status(201).json(result);
  } catch (error) {
    logger.error(`Error creating short URL: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

router.get('/:shortcode', async (req, res) => {
  try {
    const stats = await urlService.getURLStats(req.params.shortcode);
    logger.info(`Stats retrieved for shortcode: ${req.params.shortcode}`);
    res.json(stats);
  } catch (error) {
    logger.error(`Error retrieving stats: ${error.message}`);
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;