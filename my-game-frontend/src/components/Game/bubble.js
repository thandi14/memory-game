import React, { useEffect, useRef, useState } from 'react';
import './bubble.css'; // Ensure your CSS is correctly styled

const Bubble = ({ color, x, y }) => {
    return (
      <div
        style={{
          position: 'absolute',
          top: y,
          left: x,
          width: '30px',
          height: '30px',
          backgroundColor: color,
          borderRadius: '50%',
        }}
      />
    );
  };

export default Bubble;
