import app from 'util/feathers/app'
import { setGlobal } from 'reactn'
import Services from 'util/feathers/Services'
import { makeReducers, makeServiceState } from './reducers'
import authState from './auth'

import addReactNDevTools from 'reactn-devtools' // needs redux as dev dep
addReactNDevTools()

const serviceStates = makeServiceState(Services) // generic service states

const initialState = {
  ...serviceStates,

  // additional service states
  auth: authState,
  app
}

const setGlobalState = () => {
  makeReducers(Services)
  return setGlobal(initialState)
}

export default setGlobalState
