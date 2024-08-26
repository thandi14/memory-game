import { combineReducers } from 'redux';
import playerReducer from './player';  // Import your single reducer

const rootReducer = combineReducers({
  players: playerReducer  // Combine reducers (even if there's only one)
});

export default rootReducer;
