import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import mainReducer from 'reducers/index.reducer';

const finalCreateStore = composeWithDevTools(applyMiddleware(thunk))(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(mainReducer, initialState);
  return store;
}
