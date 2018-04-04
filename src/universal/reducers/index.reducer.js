import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';

import user from './user.reducer';
import appState from './app-state.reducer';
import item from './item.reducer';

const mainReducer = combineReducers({
  router: routerReducer,
  form: reduxFormReducer,
  user,
  appState,
  item,
});

export default mainReducer;
