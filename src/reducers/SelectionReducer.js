export default (state = null, action) => {
  switch (action.type) {
    case "select_foodlog":
      return action.payload;
    case "deselect_foodlog":
      return action.payload;
    default:
      return state;
  }
};
