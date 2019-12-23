export const SET_CURRENT_PLAYER = "SET_CURRENT_PLAYER";

export const setCurrentPlayer = (payload: string) => {
  console.log("Action", payload);
  return {
    type: SET_CURRENT_PLAYER,
    payload
  };
};
