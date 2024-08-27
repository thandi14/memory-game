import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import * as playerActions from '../../store/player';
import { thunkGetPlayers } from '../../store/player'; // Adjust path as needed
import "./bubbleshooter.css"
import './bubbleshooter.css';  // Ensure this file contains the necessary styles
import Bubble from './bubble';

const findConnectedBubbles = (bubbles, startIndex, color) => {
    const connected = [];
    const queue = [startIndex];
    const visited = new Set();

    console.log("shooter & color:", bubbles[startIndex], color,)

    while (queue.length > 0) {
      const index = queue.shift();
      if (visited.has(index)) continue;

      const bubble = bubbles[index];
      if (!bubble || bubble.color !== color) continue;
      console.log("shouldnt pass if not =:", "shooter & color:", bubbles[startIndex], color, "hit bubble", bubbles[index])

      visited.add(index);
      connected.push(index);


      // Get neighbors
      const neighbors = [
        index - 13, // Top
        index + 13, // Bottom
        index - 1,  // Left
        index + 1   // Right
      ];

      neighbors.forEach(neighborIndex => {
        if (neighborIndex >= 0 && neighborIndex < bubbles.length && !visited.has(neighborIndex)) {
          queue.push(neighborIndex);
        }
      });
    }

    return connected;
  };

  // Remove bubbles and apply gravity
  const removeAndApplyGravity = (bubbles, indexesToRemove) => {
    const newBubbles = bubbles.filter((_, index) => !indexesToRemove.includes(index));

    // Apply gravity
    const columns = {};
    newBubbles.forEach((bubble, index) => {
      const col = Math.floor(bubble.x / 30);
      if (!columns[col]) columns[col] = [];
      columns[col].push(bubble);
    });

    const sortedBubbles = [];
    Object.keys(columns).forEach(col => {
      const colBubbles = columns[col];
      colBubbles.forEach((bubble, row) => {
        sortedBubbles.push({ ...bubble, y: (sortedBubbles.filter(b => b.x === bubble.x).length * 30) });
      });
    });

    return sortedBubbles;
  };

  const BubbleShooter = () => {
    const [bubbles, setBubbles] = useState([]);
    const [shooterBubble, setShooterBubble] = useState(null);
    const [velocity, setVelocity] = useState({ x: 0, y: 0 });
    const boardRef = useRef(null);
    const bubbleSize = 30;
    const speed = 5;

    // Initialize bubbles
    useEffect(() => {
      const initialBubbles = [];
      for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 13; col++) {
          const color = ['red', 'blue', 'green', 'purple'][Math.floor(Math.random() * 4)];
          initialBubbles.push({
            color,
            x: col * bubbleSize,
            y: row * bubbleSize
          });
        }
      }
      setBubbles(initialBubbles);
    }, []);

    // Initialize shooter bubble
    useEffect(() => {
      if (!boardRef.current) return;

      setShooterBubble({
        color: 'red',
        x: (boardRef.current.offsetWidth - bubbleSize) / 2,
        y: boardRef.current.offsetHeight - bubbleSize
      });
    }, [boardRef.current]);

    // Handle shooting
    const handleShoot = (event) => {
      if (!boardRef.current) return;

      const rect = boardRef.current.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;

      const shooterX = shooterBubble.x;
      const shooterY = shooterBubble.y;

      const deltaX = clickX - shooterX;
      const deltaY = clickY - shooterY;
      const magnitude = Math.sqrt(deltaX ** 2 + deltaY ** 2);

      if (magnitude === 0) return;

      setVelocity({
        x: (deltaX / magnitude) * speed,
        y: (deltaY / magnitude) * speed
      });
    };

    // Move bubble and handle collisions
    useEffect(() => {
      if (!shooterBubble) return;

      const interval = setInterval(() => {
        setShooterBubble(prev => {
          if (!prev) return null;

          const newX = prev.x + velocity.x;
          const newY = prev.y + velocity.y;

          // Check for collision with walls
          if (newX < 0 || newX > boardRef.current.offsetWidth - bubbleSize || newY < 0) {
            setVelocity({ x: 0, y: 0 });
            return prev;
          }

          // Check for collision with bubbles
          const collisionIndex = bubbles.findIndex(bubble =>
            newX >= bubble.x && newX <= bubble.x + bubbleSize &&
            newY >= bubble.y && newY <= bubble.y + bubbleSize
          );

          if (collisionIndex >= 0) {
            const color = shooterBubble.color;
            const connectedIndexes = findConnectedBubbles(bubbles, collisionIndex, color);
            console.log(shooterBubble)

            if (connectedIndexes.length >= 2) {
              // Bubbles are matched
              const newBubbles = removeAndApplyGravity(bubbles, connectedIndexes);
              setBubbles(newBubbles);
            } else {
              // Bubbles do not match, place it where it hit
              const newBubble = { ...prev, x: newX, y: newY };
              setBubbles([...bubbles, newBubble]);
            }

            setShooterBubble(null);
            setVelocity({ x: 0, y: 0 });
            return null;
          }

          return { ...prev, x: newX, y: newY };
        });
      }, 20);

      return () => clearInterval(interval);
    }, [shooterBubble, velocity, bubbles]);

    return (
      <div
        ref={boardRef}
        className="game-board"
        onClick={handleShoot}
        style={{ position: 'relative', width: '800px', height: '600px', border: '1px solid black' }}
      >
        {bubbles.map((bubble, index) => (
          <Bubble key={index} color={bubble.color} x={bubble.x} y={bubble.y} />
        ))}
        {shooterBubble && (
          <Bubble color={shooterBubble.color} x={shooterBubble.x} y={shooterBubble.y} />
        )}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: (boardRef.current ? (boardRef.current.offsetWidth - bubbleSize) / 2 : 0),
            width: bubbleSize,
            height: bubbleSize,
            backgroundColor: shooterBubble ? shooterBubble.color : 'gray',
            borderRadius: '50%',
          }}
        />
      </div>
    );
  };

  export default BubbleShooter;
