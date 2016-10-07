import { combineReducers } from 'redux';
import SessionReducer from './SessionReducer';

export default combineReducers({
  currentUser: SessionReducer,
});
