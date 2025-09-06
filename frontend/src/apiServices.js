// apiService.js
import axios from 'axios';
import { Log } from './loggingMiddleware';

const apiService = {
  createShortURL: async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/shorturls', data);
      await Log("frontend", "info", "api", "Short URL created");
      return response.data;
    } catch (error) {
      await Log("frontend", "error", "api", `API Error in createShortURL: ${error.message}`);
      console.error(`API Error: ${error.message}`);
      throw error;
    }
  },
  getURLStats: async (shortcode) => {
    try {
      const response = await axios.get(`http://localhost:3000/shorturls/${shortcode}`);
      await Log("frontend", "info", "api", `URL stats fetched for shortcode: ${shortcode}`);
      return response.data;
    } catch (error) {
      await Log("frontend", "error", "api", `API Error in getURLStats: ${error.message}`);
      console.error(`API Error: ${error.message}`);
      throw error;
    }
  },
};

export default apiService;
