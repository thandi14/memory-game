const GET_PLAYERS = "player/getPlayers";


const getPlayers = (players) => {
  return {
    type: GET_PLAYERS,
    players,
  };
};

// export const thunkGetPlayers = (id, data) => async (dispatch) => {
//     const response = await fetch(`/api/players`)
//     const data1 = await response.json();
//     dispatch(getPlayers(data1));
//     return response;

// };

export const thunkGetPlayers = () => async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:5000/api/players`);

      // Check if response is ok
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      dispatch(getPlayers(data));
      return data;
    } catch (error) {
      console.error('Failed to fetch players:', error);
      // You might want to dispatch an error action here
      throw error; // Re-throw the error if needed
    }
  };

  const initialState = {
    players: {}, // Adjust this if players are an array or another structure
    loading: false,
    error: null,
  };

  const playerReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PLAYERS:
        // Use a new object to avoid mutating the existing state
        const newPlayersState = { ...state.players };
        action.players.forEach(
          (player) => (newPlayersState[player.id] = { ...player })
        );
        return {
          ...state,
          players: newPlayersState,
        };

      // Add cases for other actions if needed

      default:
        // Always return the current state if the action type doesn't match
        return state;
    }
  };

  export default playerReducer;
