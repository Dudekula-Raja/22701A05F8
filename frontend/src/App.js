import React from 'react';
import URLShortener from '../src/components/URLShortener';
import URLStatistics from '../src/components/URLStatistics';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <URLShortener />
      <URLStatistics />
    </div>
  );
};

export default App;