import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './session';  // Import the combined reducers

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
