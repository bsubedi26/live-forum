import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from 'reducers';
import promiseMiddleware from 'redux-promise-middleware';
import { persistStore } from 'redux-persist';

import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createHashHistory';

export const history = createHistory();
const routeMiddleware = routerMiddleware(history);

const middlewares = [
  ReduxThunk,
  promiseMiddleware(),
  routeMiddleware,
]
const enhancer = [applyMiddleware(...middlewares)];

export default function configureStore(initialState = {}) {
  const { pathname, search, hash } = window.location;

  // Fix for react-router-redux initial state, which is null on initial app load
  initialState = {
    router: { location: { pathname, search, hash } }
  }

  let store = createStore(rootReducer, initialState, ...enhancer);
  let persistor = persistStore(store);
  return { store, persistor };
}
