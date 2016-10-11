import { combineReducers } from 'redux';
import SessionReducer from './SessionReducer';
import RecipesReducer from './RecipesReducer';
import FoodlogReducer from './FoodlogReducer'


export default combineReducers({
  currentUser: SessionReducer,
  recipes: RecipesReducer,
  foodlog: FoodlogReducer,
});
