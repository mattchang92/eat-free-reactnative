export default (state = false, action) => {
  switch (action.type) {
    case "login":
      return action.payload;
    case 'logout':
      return action.payload;
    default:
      return state;
  }
};
