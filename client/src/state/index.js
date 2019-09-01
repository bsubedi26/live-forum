import { setGlobal } from 'reactn'
import './reducers'

import addReactNDevTools from 'reactn-devtools' // needs redux as dev dep
addReactNDevTools()

const initialState = {
  auth: {},
  users: [],
  user: {},
  threads: [],
  thread: {},
  comments: {},
  topics: [],
  topic: {},
  movies: [],
  channelRooms: []
}

const setGlobalState = () => (
  setGlobal(initialState)
)

export default setGlobalState
