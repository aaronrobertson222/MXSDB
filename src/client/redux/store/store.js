import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { routerMiddleware } from 'react-router-redux';
import mainReducer from 'reducers/index.reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import promiseMiddleware from '../middleware/promise-middleware';

export default function configureStore(initialState, history) {
  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'appState'],
  };

  const persistedReducer = persistReducer(persistConfig, mainReducer);
  const historyMiddleware = routerMiddleware(history);
  const finalCreateStore = composeWithDevTools(applyMiddleware(
    thunk,
    promiseMiddleware,
    historyMiddleware,
  ))(createStore);

  const store = finalCreateStore(persistedReducer, initialState);
  const persistor = persistStore(store);

  if (module.hot) {
    module.hot.accept(() => {
      // This fetch the new state of the above reducers.
      const nextRootReducer = mainReducer;
      store.replaceReducer(persistReducer(persistConfig, nextRootReducer));
    });
  }
  return { store, persistor };
}
