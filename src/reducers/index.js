import { combineReducers } from 'redux';
import SessionReducer from './SessionReducer';
import RecipesReducer from './RecipesReducer';
import FoodlogReducer from './FoodlogReducer';
import SelectionReducer from './SelectionReducer';

export default combineReducers({
  currentUser: SessionReducer,
  recipes: RecipesReducer,
  foodlog: FoodlogReducer,
  selectedFoodlogId: SelectionReducer
});
