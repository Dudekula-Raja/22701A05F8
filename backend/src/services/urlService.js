const URL = require('../models/url');
const generateShortcode = require('../utils/generateShortcode');
const logger=require('../config/logger')

const createShortURL = async (url, validity, shortcode) => {
  const expiry = validity ? new Date(Date.now() + validity * 60000) : new Date(Date.now() + 30 * 60000);
  const finalShortcode = shortcode || generateShortcode();
  const shortURL = new URL({ url, shortcode: finalShortcode, expiry });
  await shortURL.save();
  return {
    shortLink: `http://${process.env.HOSTNAME}:${process.env.PORT}/${finalShortcode}`,
    expiry: expiry.toISOString(),
  };
};

const getURLStats = async (shortcode) => {
  const url = await URL.findOne({ shortcode });
  if (!url) throw new Error('Shortcode not found');
  return {
    totalClicks: url.clicks.length,
    originalURL: url.url,
    createdAt: url.createdAt,
    expiry: url.expiry,
    clickData: url.clicks,
  };
};

module.exports = { createShortURL, getURLStats };