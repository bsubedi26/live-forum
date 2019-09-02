import app from 'util/feathers/app'
import { setGlobal } from 'reactn'
import Services from 'util/feathers/Services'
import { makeReducers } from './reducers'
import authState from './auth'

import addReactNDevTools from 'reactn-devtools' // needs redux as dev dep
addReactNDevTools()

const serviceStates = {
  users: [],
  user: null,
  threads: [],
  thread: null,
  comments: [],
  topics: [],
  topic: null,
  movies: [],
  auth: authState,
  app
}

const initialState = {
  ...serviceStates
}

const setGlobalState = () => {
  makeReducers(Services)
  return setGlobal(initialState)
}

export default setGlobalState
