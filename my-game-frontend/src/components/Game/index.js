import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import * as playerActions from '../../store/player';
import { thunkGetPlayers } from '../../store/player'; // Adjust path as needed
import "./bubbleshooter.css"

// const BubbleShooter = () => {
//   const dispatch = useDispatch();
//   const { players } = useSelector(state => state.players);
//   const [bubble, setBubble] = useState(false);
//   const [currentBubble, setCurrentBubble] = useState({});


//   useEffect(() => {
//     dispatch(thunkGetPlayers());
//   }, [dispatch]);

//   const [rotation, setRotation] = useState(0);
//   const referenceDivRef = useRef(null);

//   const handleMouseMove = (event) => {
//     if (!referenceDivRef.current) return;

//     const { clientX: mouseX } = event;
//     const rect = referenceDivRef.current.getBoundingClientRect();

//     const centerX = rect.left + rect.width / 2;

//     const angleRange = 180;
//     const deltaX = mouseX - centerX;
//     let angle = (deltaX / rect.width) * angleRange;

//     angle = Math.max(-angleRange / 2, Math.min(angleRange / 2, angle));

//     // Set the rotation angle
//     setRotation(angle);
//   };

//   useEffect(() => {
//     window.addEventListener('mousemove', handleMouseMove);

//     // Cleanup event listener on component unmount
//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   let ps = Object.values(players)
//   const generateMatrixWithColors = (rows, cols, colors) => {
//     const matrix = Array.from({ length: rows }, () => Array(cols).fill("none"));
//     for (let row = 0; row < 4; row++) {
//       for (let col = 0; col < cols; col++) {
//         matrix[row][col] = colors[Math.floor(Math.random() * colors.length)];
//       }
//     }
//     return matrix;
//   };

//   const [matrix, setMatrix] = useState([]);
//   const rows = 13;
//   const cols = 13;
//   const colors = ["red", "yellow", "blue", "green", "pink", "purple"];

//   useEffect(() => {
//     // Initialize matrix with colors for the first 4 rows
//     setMatrix(generateMatrixWithColors(rows, cols, colors));
//   }, []);

//   const handleBubbleClick = (event) => {
//     setBubble(true)
//     const rect = event.currentTarget.getBoundingClientRect();
//     const centerX = rect.left + rect.width / 2;
//     const centerY = rect.top + rect.height / 2;

//     // Calculate direction from center to the click position
//     const clickX = event.clientX - centerX;
//     const clickY = event.clientY - centerY;

//     // Set the initial bubble's color and position
//     setCurrentBubble({
//       color: colors[Math.floor(Math.random() * colors.length)],
//       x: centerX,
//       y: centerY,
//       dx: clickX,
//       dy: clickY
//     });
//   };

//   useEffect(() => {
//     const moveBubble = () => {
//       if (currentBubble) {
//         setCurrentBubble(prev => {
//           const newBubble = { ...prev };
//           newBubble.x += newBubble.dx * 0.1;
//           newBubble.y += newBubble.dy * 0.1;

//           // Check for boundary collision
//           if (newBubble.x < 0 || newBubble.x > window.innerWidth || newBubble.y < 0 || newBubble.y > window.innerHeight) {
//             // Bounce or remove logic here
//             return null; // Bubble goes out of bounds
//           }

//           // Update bubble position
//           return newBubble;
//         });
//       }
//     };

//     const interval = setInterval(moveBubble, 20);

//     return () => clearInterval(interval);
//   }, [currentBubble]);

//   const handleCollision = (bubble) => {
//     // Implement collision detection and bubble removal logic
//     // Check if the bubble hits any other bubble and match color
//     // If the color matches, remove the bubble and handle score or game state
//   };

//   console.log(matrix)


//   return (
//     <div>
//       <h1>Bubble Shooter</h1>
//       <div  onClick={handleBubbleClick} ref={referenceDivRef} class="game-box">
//       {matrix.map((row, rowIndex) => (
//         <div key={rowIndex} style={{ zIndex: !row.every((c) => c == "none") && "5", backgroundColor: "white", display: 'flex', width: "100%", justifyContent: "space-evenly" }}>
//           {row.map((color, colIndex) => (
//             <span
//               id="bubble"
//               key={colIndex}
//               style={{
//                 display: 'block',
//                 backgroundColor: color,
//                 margin: '1px'
//               }}
//             />
//           ))}
//         </div>
//       ))}
//       <span class="shooter"
//               style={{
//                 top: currentBubble?.y,
//                 left: currentBubble?.x,
//                 display: 'flex',
//                 backgroundColor: "black",
//                 margin: '1px'
//               }}>
//                 <div>
//                 { !bubble && <span style={{ position: "absolute", transform: ` rotate(${rotation}deg)`,
//         transformOrigin: '0% 100%',
//         pointerEvents: 'none', }} id="line">
//                 </span>}
//                 </div>
//       </span>
//       </div>
//     </div>
//   );
// };

// export default BubbleShooter;

// import React, { useEffect, useRef, useState } from 'react';
// import './bubbleshooter.css';

// // Bubble Shooter Component
// const BubbleShooter = () => {
//   const [matrix, setMatrix] = useState([]);
//   const [shooterBubble, setShooterBubble] = useState(null);
//   const [currentBubble, setCurrentBubble] = useState(null);
//   const gameBoxRef = useRef(null);
//   const rows = 13;
//   const cols = 13;
//   const colors = ["red", "yellow", "blue", "green", "pink", "purple"];
//   const bubbleSize = 30; // Size of each bubble
//   const speed = 5; // Movement speed of the bubble

//   useEffect(() => {
//     // Initialize matrix with colors for the first 4 rows
//     const initialMatrix = Array.from({ length: rows }, () => Array(cols).fill("none"));
//     for (let row = 0; row < 4; row++) {
//       for (let col = 0; col < cols; col++) {
//         initialMatrix[row][col] = colors[Math.floor(Math.random() * colors.length)];
//       }
//     }
//     setMatrix(initialMatrix);

//     // Initialize shooter bubble with a random color
//     setShooterBubble({
//       color: colors[Math.floor(Math.random() * colors.length)],
//       x: 0,
//       y: 0
//     });
//   }, []);

//   const handleMouseClick = (event) => {
//     if (!gameBoxRef.current) return;

//     const rect = gameBoxRef.current.getBoundingClientRect();
//     const centerX = rect.left + rect.width / 2;
//     const bottomCenterY = rect.top + rect.height;

//     const clickX = event.clientX - centerX;
//     const clickY = event.clientY - bottomCenterY;

//     const magnitude = Math.sqrt(clickX ** 2 + clickY ** 2);
//     const dx = (clickX / magnitude) * speed;
//     const dy = (clickY / magnitude) * speed;

//     setCurrentBubble({
//       color: shooterBubble.color,
//       x: centerX,
//       y: bottomCenterY,
//       dx,
//       dy
//     });

//     // Set a new color for the next shooter bubble
//     setShooterBubble({
//       color: colors[Math.floor(Math.random() * colors.length)],
//       x: 0,
//       y: 0
//     });
//   };

//   useEffect(() => {
//     if (!currentBubble || !gameBoxRef.current) return;

//     const gameBoxRect = gameBoxRef.current.getBoundingClientRect();
//     let animationFrameId;

//     const detectCollision = () => {
//       if (!currentBubble) return;

//       const { x, y, color } = currentBubble;
//       const bubbleCol = Math.floor((x - gameBoxRect.left) / bubbleSize);
//       const bubbleRow = Math.floor((y - gameBoxRect.top) / bubbleSize);

//       // Update bubble position
//       setCurrentBubble(prev => ({
//         ...prev,
//         x: prev.x + prev.dx,
//         y: prev.y + prev.dy
//       }));

//       // Check if bubble is within bounds
//       if (bubbleRow >= 0 && bubbleRow < rows && bubbleCol >= 0 && bubbleCol < cols) {
//         const targetColor = matrix[bubbleRow][bubbleCol];
//         if (targetColor !== "none" && targetColor === color) {
//           // Bubble hits another bubble of the same color, place it in the matrix
//           const dropRow = getDropRow(bubbleRow, bubbleCol);
//           const newMatrix = matrix.map((row, rowIndex) =>
//             row.map((cell, colIndex) =>
//               rowIndex === dropRow && colIndex === bubbleCol ? color : cell
//             )
//           );

//           setMatrix(newMatrix);
//           setCurrentBubble(null);
//           return;
//         }
//       }

//       // Boundary check
//       if (currentBubble.x < gameBoxRect.left || currentBubble.x > gameBoxRect.right) {
//         setCurrentBubble(prev => ({ ...prev, dx: -prev.dx }));
//       }
//       if (currentBubble.y < gameBoxRect.top || currentBubble.y > gameBoxRect.bottom) {
//         setCurrentBubble(prev => ({ ...prev, dy: -prev.dy }));
//       }

//       // Continue checking collision
//       animationFrameId = requestAnimationFrame(detectCollision);
//     };

//     detectCollision();

//     return () => cancelAnimationFrame(animationFrameId);
//   }, [currentBubble, matrix]);

//   const getDropRow = (hitRow, col) => {
//     let row = hitRow + 1;
//     while (row < rows && matrix[row][col] === "none") {
//       row++;
//     }
//     return row - 1;
//   };

//   return (
//     <div>
//       <h1>Bubble Shooter</h1>
//       <div
//         className="game-box"
//         ref={gameBoxRef}
//         onClick={handleMouseClick}
//         style={{ position: 'relative', width: '100%', height: '600px', border: '1px solid black' }}
//       >
//         {matrix.map((row, rowIndex) => (
//           <div key={rowIndex} style={{ display: 'flex', width: "100%", justifyContent: "space-evenly" }}>
//             {row.map((color, colIndex) => (
//               <span
//                 key={colIndex}
//                 style={{
//                   display: 'block',
//                   backgroundColor: color,
//                   width: `${bubbleSize}px`,
//                   height: `${bubbleSize}px`,
//                   borderRadius: '50%',
//                   margin: '1px'
//                 }}
//               />
//             ))}
//           </div>
//         ))}
//         {currentBubble && (
//           <div
//             style={{
//               position: 'absolute',
//               top: currentBubble.y - bubbleSize / 2,
//               left: currentBubble.x - bubbleSize / 2,
//               width: `${bubbleSize}px`,
//               height: `${bubbleSize}px`,
//               backgroundColor: currentBubble.color,
//               borderRadius: '50%',
//               transform: 'translate(-50%, -50%)', // Center bubble
//             }}
//           />
//         )}
//         {shooterBubble && (
//           <div
//             style={{
//               position: 'absolute',
//               bottom: 0,
//               left: '50%',
//               width: `${bubbleSize}px`,
//               height: `${bubbleSize}px`,
//               backgroundColor: shooterBubble.color,
//               borderRadius: '50%',
//               transform: 'translate(-50%, 0)', // Center horizontally at the bottom
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default BubbleShooter;


// src/BubbleShooter.js


// src/Game.js
import BubbleGrid from './bubblegrid';
import Shooter from './shooter';

const colors = ['red', 'blue', 'green']; // Add more colors as needed

const generateGrid = () => {
    const rows = 13;
    const cols = 13;
    const grid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => null));

    // Fill the first 4 rows with bubbles
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < cols; c++) {
        grid[r][c] = { color: colors[Math.floor(Math.random() * colors.length)] };
      }
    }


    return grid;
  };


const BubbleShooter = () => {
  const [grid, setGrid] = useState(generateGrid());
  const [currentBubble, setCurrentBubble] = useState({ color: colors[Math.floor(Math.random() * colors.length)] });

  const shootBubble = () => {
    // Logic to handle bubble shooting and matching
    console.log('Shooting bubble:', currentBubble.color);
    // For demonstration, this will just reset the shooter
    setCurrentBubble({ color: colors[Math.floor(Math.random() * colors.length)] });
  };

  const handleBubbleClick = (rowIndex, colIndex) => {
    console.log('Bubble clicked:', grid[rowIndex][colIndex]);
    // Implement bubble match and remove logic here
  };

  return (
    <div className="game">
      <BubbleGrid grid={grid} onBubbleClick={handleBubbleClick} />
      <Shooter currentBubble={currentBubble} onShoot={shootBubble} />
    </div>
  );
};

export default BubbleShooter;
