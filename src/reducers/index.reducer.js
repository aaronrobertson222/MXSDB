import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';


const mainReducer = combineReducers({
  router: routerReducer,
});

export default mainReducer;
