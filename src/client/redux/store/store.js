import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import mainReducer from 'reducers/index.reducer';
import historyMiddleware from '../middleware/history-middleware';
import promiseMiddleware from '../middleware/promise-middleware';

const finalCreateStore = composeWithDevTools(applyMiddleware(
  thunk,
  promiseMiddleware,
  historyMiddleware,
))(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(mainReducer, initialState);
  return store;
}
