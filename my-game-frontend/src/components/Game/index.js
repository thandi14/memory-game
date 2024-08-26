import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import * as playerActions from '../../store/player';
import { thunkGetPlayers } from '../../store/player'; // Adjust path as needed
import "./bubbleshooter.css"

const BubbleShooter = () => {
  const dispatch = useDispatch();
  const { players } = useSelector(state => state.players);

  useEffect(() => {
    dispatch(thunkGetPlayers());
  }, [dispatch]);

  const [rotation, setRotation] = useState(0);
  const referenceDivRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!referenceDivRef.current) return;

    const { clientX: mouseX } = event;
    const rect = referenceDivRef.current.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;

    const angleRange = 180;
    const deltaX = mouseX - centerX;
    let angle = (deltaX / rect.width) * angleRange;

    angle = Math.max(-angleRange / 2, Math.min(angleRange / 2, angle));

    // Set the rotation angle
    setRotation(angle);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  let ps = Object.values(players)
  const generateMatrixWithColors = (rows, cols, colors) => {
    const matrix = Array.from({ length: rows }, () => Array(cols).fill(""));
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < cols; col++) {
        matrix[row][col] = colors[Math.floor(Math.random() * colors.length)];
      }
    }
    return matrix;
  };

  const [matrix, setMatrix] = useState([]);
  const rows = 13;
  const cols = 13;
  const colors = ["red", "yellow", "blue", "green", "pink", "purple"];

  useEffect(() => {
    // Initialize matrix with colors for the first 4 rows
    setMatrix(generateMatrixWithColors(rows, cols, colors));
  }, []);


  return (
    <div>
      <h1>Bubble Shooter</h1>
      <div  ref={referenceDivRef} class="game-box">
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', width: "100%", justifyContent: "space-evenly" }}>
          {row.map((color, colIndex) => (
            <span
              id="bubble"
              key={colIndex}
              style={{
                display: 'block',
                backgroundColor: color,
                margin: '1px'
              }}
            />
          ))}
        </div>
      ))}
      <span class="shooter"
              style={{
                display: 'flex',
                backgroundColor: "black",
                margin: '1px'
              }}>
                <div>
                <span style={{ position: "absolute", transform: `translate(50%, 0%) rotate(${rotation}deg)`,
        transformOrigin: '0% 100%',
        pointerEvents: 'none', }} id="line">

                </span>
                </div>
      </span>
      </div>
    </div>
  );
};

export default BubbleShooter;
