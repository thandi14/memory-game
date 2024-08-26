import React, { useEffect, useRef, useState } from 'react';
import './bubble.css'; // Ensure your CSS is correctly styled

const Bubble = ({ color }) => {
    const bubbleRef = useRef(null);
    const [velocity, setVelocity] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleDocumentClick = (event) => {
            const bubble = bubbleRef.current;
            if (!bubble) return;

            // Get the position of the click
            const clickX = event.clientX;
            const clickY = event.clientY;

            // Get the current bubble position
            const bubbleRect = bubble.getBoundingClientRect();
            const bubbleX = bubbleRect.left + bubbleRect.width / 2;
            const bubbleY = bubbleRect.top + bubbleRect.height / 2;

            // Calculate the direction vector (normalized)
            const deltaX = clickX - bubbleX;
            const deltaY = clickY - bubbleY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const directionX = deltaX / distance;
            const directionY = deltaY / distance;

            // Set the velocity of the bubble
            setVelocity({ x: directionX * 5, y: directionY * 5 }); // Adjust the multiplier to control speed
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    useEffect(() => {
        const bubble = bubbleRef.current;

        const moveBubble = () => {
            if (!bubble) return;

            const currentLeft = parseFloat(bubble.style.left || 0);
            const currentTop = parseFloat(bubble.style.top || 0);

            bubble.style.left = `${currentLeft + velocity.x}px`;
            bubble.style.top = `${currentTop + velocity.y}px`;

            requestAnimationFrame(moveBubble);
        };

        moveBubble();
    }, [velocity]);

    return (
        <div ref={bubbleRef} id="bubble" className={`bubble ${color}`}></div>
    );
};

export default Bubble;
