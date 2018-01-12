import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from 'reducers';
import promiseMiddleware from 'redux-promise-middleware';
import { persistStore } from 'redux-persist';

const middlewares = [
  ReduxThunk,
  promiseMiddleware(),
]
const enhancer = [applyMiddleware(...middlewares)];

export default function configureStore(initialState = {}) {
  let store = createStore(rootReducer, initialState, ...enhancer);
  let persistor = persistStore(store);
  return { store, persistor };
}
