import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import * as playerActions from '../../store/player';
import { thunkGetPlayers } from '../../store/player'; // Adjust path as needed


const BubbleShooter = () => {
  const dispatch = useDispatch();
  const { players } = useSelector(state => state.players);

  useEffect(() => {
    dispatch(thunkGetPlayers());
  }, [dispatch]);

  let ps = Object.values(players)

  return (
    <div>
      <h1>Bubble Shooter</h1>
      <ul>
        {ps.map(player => (
          <li key={player.id}>{player.username} - Score: {player.score}</li>
        ))}
      </ul>
    </div>
  );
};

export default BubbleShooter;
