import React, { useState, useEffect } from 'react';
import './App.css';
import monkey from './img/monkey.png';
import frog from './img/frog.png';
import turtle from './img/turtle.png';
import dog from './img/dog.png';
import lion from './img/lion.png';
import elephant from './img/elephant.png';
import playingCard from './img/card.png';

const numberOfUniqueCards = 6; // Change this to the number for amount of cards you want to show

const cardImages = [
  { src: monkey, matched: false },
  { src: frog, matched: false },
  { src: turtle, matched: false },
  { src: dog, matched: false },
  { src: lion, matched: false },
  { src: elephant, matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);

  // Shuffle and set up new cards
  const shuffleCards = () => {
    // Limit the number of unique cards to display
    const selectedImages = cardImages.slice(0, numberOfUniqueCards);
    const shuffledCards = [...selectedImages, ...selectedImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setFirstChoice(null);
    setSecondChoice(null);
    setCards(shuffledCards);
    setMoves(0);
  };

  // Handle card selection
  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  };

  // Compare selected cards
  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      if (firstChoice.src === secondChoice.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === firstChoice.src ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  // Reset choices & increase move count
  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setMoves((prevMoves) => prevMoves + 1);
    setDisabled(false);
  };

  // Start a new game
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <div id="grid">
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === firstChoice || card === secondChoice || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      </div>
      <div id="intro">
      <h1>Matching Card Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <p>Moves: {moves}</p>
      </div>
    </div>
  );
}

function Card({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className={`card-inner ${flipped ? 'flipped' : ''}`}>
        <div
          className="back"
          style={{ backgroundImage: `url(${playingCard})` }}
        ><img style={{width: "50%",
          height: "50%"}} src={card.src}></img></div>
        <div
          className="front"
          style={{ backgroundImage: `url(${playingCard})` }}
        />
      </div>
    </div>
  );
}

export default App;
