// src/BubbleGrid.js
import React from 'react';
import Bubble from './bubble';
import "./bubbleshooter.css"

const BubbleGrid = ({ grid, onBubbleClick }) => {
  return (
    <div className="bubble-grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="bubble-row">
          {row.map((bubble, colIndex) => (
            bubble ? (
              <Bubble
                key={colIndex}
                color={bubble.color}
                onClick={() => onBubbleClick(rowIndex, colIndex)}
              />
            ) : null
          ))}
        </div>
      ))}
    </div>
  );
};

export default BubbleGrid;
