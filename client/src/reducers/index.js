// import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage' // or whatever storage you are using
import { persistCombineReducers } from 'redux-persist'
import { routerReducer as router } from 'react-router-redux'

import auth from './auth'
import app from './app'
import { services } from 'util/feathers'

const config = {
  key: 'primary',
  storage,
}

const rootReducer = persistCombineReducers(config, {
  auth,
  app,
  router,
  
  user: services.user.reducer,
  forum: services.forum.reducer,
  comment: services.comment.reducer,
})

export default rootReducer
