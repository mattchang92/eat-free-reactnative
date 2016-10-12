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

export const updateFoodlog = (response) => {
  return {
    type: 'access_foodlog',
    payload: response
  }
}

export const selectFoodlog = (foodlogId) => {
  return {
    type: 'select_foodlog',
    payload: foodlogId
  };
};

export const deselectFoodlog = () => {
  return {
    type: 'deselect_foodlog',
    payload: null
  };
};
