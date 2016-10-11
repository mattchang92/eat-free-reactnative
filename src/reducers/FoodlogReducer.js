import ENV from '../../app_keys'
import { AsyncStorage } from 'react-native'

export default (state = "", action) => {
  switch (action.type) {
    case "access_foodlog":
      return accessFoodlog();
    default:
      return state;
  }
};

accessFoodlog = () => {
  let foodlog = '';

  AsyncStorage.getItem('UserApiKey').then(key => {
    fetch(ENV.BASE_URL + "/api/v1/foodlogs", {
      headers: {
        'CLIENT_KEY': ENV.CLIENT_KEY,
        'API_KEY': key,
      }
    })
    .then(response => response.json())
    .then(json => { foodlog = json })
  })
  return foodlog;
}
