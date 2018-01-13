// import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistCombineReducers } from 'redux-persist';
import { routerReducer as router } from 'react-router-redux';
import reduceReducers from 'reduce-reducers';

import rootReducer from './root';
import auth from './auth';
import { services } from 'util/feathers';

const config = {
  key: 'primary',
  storage,
}

const allReducers = persistCombineReducers(config, {
  auth,
  router,
  
  users: services.users.reducer,
  threads: services.threads.reducer,
  comments: services.comments.reducer,
  topics: services.topics.reducer,
})

// STATE IS THE WHOLE STORE TREE
const combinedReducer = reduceReducers(allReducers, rootReducer)

export default combinedReducer;
