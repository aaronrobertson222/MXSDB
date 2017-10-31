import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import mainReducer from 'reducers/index.reducer';
import HistoryMiddleware from '../middleware/HistoryMiddleware';

const finalCreateStore = composeWithDevTools(applyMiddleware(
  thunk,
  HistoryMiddleware,
))(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(mainReducer, initialState);
  return store;
}
