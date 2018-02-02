import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { routerMiddleware } from 'react-router-redux';
import mainReducer from 'reducers/index.reducer';
import promiseMiddleware from '../middleware/promise-middleware';

export default function configureStore(initialState, history) {
  const historyMiddleware = routerMiddleware(history);
  const finalCreateStore = composeWithDevTools(applyMiddleware(
    thunk,
    promiseMiddleware,
    historyMiddleware,
  ))(createStore);
  const store = finalCreateStore(mainReducer, initialState);
  return store;
}
