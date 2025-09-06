const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  url: { type: String, required: true },
  shortcode: { type: String, required: true, unique: true },
  expiry: { type: Date, default: () => new Date(Date.now() + 30 * 60000) },
  clicks: [{ timestamp: Date, source: String, location: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('URL', urlSchema);