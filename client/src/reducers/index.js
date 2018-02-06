import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { routerReducer as router } from 'react-router-redux';
import reduceReducers from 'reduce-reducers';
import { loadingBarReducer } from 'react-redux-loading-bar'

import rootReducer from './root';
import auth from './auth';
import ui from './ui';
import { services } from 'util/feathers';

const config = {
  key: 'primary',
  storage,
}

const allReducers = persistCombineReducers(config, {
  auth,
  router,
  ui,
  loadingBar: loadingBarReducer,
  
  users: services.users.reducer,
  threads: services.threads.reducer,
  comments: services.comments.reducer,
  topics: services.topics.reducer,
  blog: services.blog.reducer,
})

const combinedReducer = reduceReducers(allReducers, rootReducer);

export default combinedReducer;
