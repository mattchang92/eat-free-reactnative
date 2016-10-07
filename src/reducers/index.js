import { combineReducers } from 'redux';
import SessionReducer from './SessionReducer';
import RecipesReducer from './RecipesReducer';

export default combineReducers({
  currentUser: SessionReducer,
  recipes: RecipesReducer,
});
