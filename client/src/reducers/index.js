// import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistCombineReducers } from 'redux-persist';
import { routerReducer as router } from 'react-router-redux';

import auth from './auth';
import { services } from 'util/feathers';

const config = {
  key: 'primary',
  storage,
}

const rootReducer = persistCombineReducers(config, {
  auth,
  router,
  
  user: services.user.reducer,
  forum: services.forum.reducer,
  comment: services.comment.reducer,
  topic: services.topic.reducer,
})

export default rootReducer;
