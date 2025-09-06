import React, { useState, useEffect } from 'react';
import apiService from '../apiServices';
import { Log } from '../loggingMiddleware';

const URLStatistics = () => {
  const [stats, setStats] = useState({});
  const [shortcode, setShortcode] = useState('');

  useEffect(() => {
    if (shortcode) {
      fetchStats();
    }
  }, [shortcode]);

  const fetchStats = async () => {
    try {
      
      await Log("frontend", "info", "api", `Attempting to fetch stats for shortcode: ${shortcode}`);
      
      const data = await apiService.getURLStats(shortcode);
      setStats(data);
      console.info(`Stats fetched for shortcode: ${shortcode}`);
      
      await Log("frontend", "info", "api", `Stats successfully fetched for shortcode: ${shortcode}`);
    } catch (error) {
      console.error(`Error fetching stats: ${error.message}`);
      
      await Log("frontend", "error", "api", `Error fetching stats for shortcode ${shortcode}: ${error.message}`);
      setStats({});
    }
  };

  const handleShortcodeChange = (value) => {
    setShortcode(value);
  };

  return (
    <div className="url-statistics">
      <h2>URL Statistics</h2>
      <input
        type="text"
        value={shortcode}
        onChange={(e) => handleShortcodeChange(e.target.value)}
        placeholder="Enter Shortcode"
      />
      <button onClick={fetchStats}>Get Stats</button>
      {Object.keys(stats).length > 0 && (
        <div>
          <p>Total Clicks: {stats.totalClicks}</p>
          <p>Original URL: {stats.originalURL}</p>
          <p>Created At: {new Date(stats.createdAt).toLocaleString()}</p>
          <p>Expiry: {new Date(stats.expiry).toLocaleString()}</p>
          <h3>Click Data:</h3>
          <ul>
            {stats.clickData && stats.clickData.map((click, index) => (
              <li key={index}>
                {new Date(click.timestamp).toLocaleString()} - Source: {click.source}, Location: {click.location}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default URLStatistics;
