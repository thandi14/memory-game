import React from 'react';
import Bubble from './bubble';
import "./bubbleshooter.css"

const Shooter = ({ currentBubble, onShoot }) => {
  return (
    <div style={{ backgroundColor: "transparent"}} className="shooter">
      <Bubble color={currentBubble.color} />
    </div>
  );
};

export default Shooter;
