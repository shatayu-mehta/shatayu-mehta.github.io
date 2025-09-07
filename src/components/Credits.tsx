import React from 'react';
import './Credits.css';

const Credits: React.FC = () => {
  return (
    <div className="credits">
      <div className="credits-content">
        <h3>Image Credits</h3>
        <p>
          Background images used under appropriate licenses. 
          Space and cyberpunk themed visuals enhance the futuristic portfolio aesthetic.
        </p>
        <div className="credits-links">
          <span>• Cyberpunk city background: Stock imagery</span>
          <span>• Spaceship assets: Custom/Stock imagery</span>
          <span>• Contact background: Sci-fi themed stock</span>
        </div>
      </div>
    </div>
  );
};

export default Credits;
