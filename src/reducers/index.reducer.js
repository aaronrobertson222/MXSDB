import { combineReducers } from 'redux';
import user from './user.reducer';

const mainReducer = combineReducers({
  user,
});

export default mainReducer;
