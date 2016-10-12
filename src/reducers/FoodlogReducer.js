import ENV from '../../app_keys'

export default (state = "", action) => {
  switch (action.type) {
    case "access_foodlog":
      return action.payload;
    default:
      return state;
  }
};
