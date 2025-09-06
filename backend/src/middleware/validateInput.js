const validateInput = (req, res, next) => {
  const { url, validity } = req.body;
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  if (!url || !urlRegex.test(url)) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }
  if (validity && (isNaN(validity) || validity <= 0)) {
    return res.status(400).json({ error: 'Invalid validity period' });
  }
  next();
};

module.exports = validateInput;