import React, { useState } from 'react';
import apiService from '../apiServices';
import { Log } from '../loggingMiddleware'; 

const URLShortener = () => {
  const [urls, setUrls] = useState(['', '', '', '', '']);
  const [validities, setValidities] = useState(['', '', '', '', '']);
  const [shortcodes, setShortcodes] = useState(['', '', '', '', '']);
  const [shortenedLinks, setShortenedLinks] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await Log("frontend", "info", "api", "URL shortening form submitted");
    
    const validUrls = urls.filter(url => url.trim()).map((url, index) => ({
      url,
      validity: validities[index] || 30,
      shortcode: shortcodes[index] || '',
    }));
    
    try {
      const results = await Promise.all(validUrls.map(data => apiService.createShortURL(data)));
      setShortenedLinks(results);
      console.info('URLs shortened successfully');
      
      await Log("frontend", "info", "api", `Successfully shortened ${results.length} URLs`);
    } catch (error) {
      console.error(`Error shortening URLs: ${error.message}`);
      
      await Log("frontend", "error", "api", `Error shortening URLs: ${error.message}`);
    }
  };

  const handleUrlChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleValidityChange = (index, value) => {
    const newValidities = [...validities];
    newValidities[index] = value;
    setValidities(newValidities);
  };

  const handleShortcodeChange = (index, value) => {
    const newShortcodes = [...shortcodes];
    newShortcodes[index] = value;
    setShortcodes(newShortcodes);
  };

  return (
    <div className="url-shortener">
      <h2>URL Shortener</h2>
      <form onSubmit={handleSubmit}>
        {urls.map((url, index) => (
          <div key={index}>
            <input
              type="url"
              value={url}
              onChange={(e) => handleUrlChange(index, e.target.value)}
              placeholder={`URL ${index + 1}`}
              required
            />
            <input
              type="number"
              value={validities[index]}
              onChange={(e) => handleValidityChange(index, e.target.value)}
              placeholder="Validity (minutes)"
            />
            <input
              type="text"
              value={shortcodes[index]}
              onChange={(e) => handleShortcodeChange(index, e.target.value)}
              placeholder="Custom Shortcode"
            />
          </div>
        ))}
        <button type="submit">Shorten URLs</button>
      </form>
      {shortenedLinks.length > 0 && (
        <div>
          <h3>Shortened Links:</h3>
          <ul>
            {shortenedLinks.map((link, index) => (
              <li key={index}>{link.shortLink} (Expires: {link.expiry})</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default URLShortener;
