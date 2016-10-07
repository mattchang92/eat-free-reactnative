export const logoutUser = () => {
  return {
    type: 'logout',
    payload: false
  };
};

export const loginUser = () => {
  return {
    type: 'login',
    payload: true
  };
};
 
