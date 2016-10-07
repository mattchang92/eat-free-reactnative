export default (state = false, action) => {
  switch (action.type) {
    case "login":
      console.log('logging in')
      return action.payload;
    case 'logout':
      console.log('logging out')
      return action.payload;
    default:
      return state;
  }
};
