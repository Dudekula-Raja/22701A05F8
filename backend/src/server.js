
// const express = require('express');
// const router = express.Router();
// const urlService = require('../src/services/urlService');
// const validateInput = require('../src/middleware/validateInput');
// const logger = require('../src/config/logger');

// router.post('/', validateInput, async (req, res) => {
//   try {
//     const { url, validity, shortcode } = req.body;
//     const result = await urlService.createShortURL(url, validity, shortcode);
//     logger.info(`Short URL created: ${result.shortLink}`);
//     res.status(201).json(result);
//   } catch (error) {
//     logger.error(`Error creating short URL: ${error.message}`);
//     res.status(400).json({ error: error.message });
//   }
// });

// router.get('/:shortcode', async (req, res) => {
//   try {
//     const stats = await urlService.getURLStats(req.params.shortcode);
//     logger.info(`Stats retrieved for shortcode: ${req.params.shortcode}`);
//     res.json(stats);
//   } catch (error) {
//     logger.error(`Error retrieving stats: ${error.message}`);
//     res.status(404).json({ error: error.message });
//   }
// });

// module.exports = router;



const express = require('express');
const mongoose = require('mongoose');
const urlRoutes = require('../src/routes/urlRoutes');
const logger = require('../src/config/logger');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env

// Suppress Mongoose strictQuery deprecation warning
mongoose.set('strictQuery', true);

const app = express();

process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection at:', err);
  process.exit(1);
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => logger.info('MongoDB connected'))
  .catch(err => logger.error('MongoDB connection error:', err));

app.use(express.json());
app.use(cors());
app.use('/shorturls', urlRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});