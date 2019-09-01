import { setGlobal } from 'reactn'
import addReactNDevTools from 'reactn-devtools' // needs redux as dev dep
import './reducers'

addReactNDevTools()

const initialState = {
  auth: {},
  users: [],
  user: {},
  threads: [],
  thread: {},
  comments: {},
  topics: [],
  topic: {}
}

const setGlobalState = () => (
  setGlobal(initialState)
)

export default setGlobalState
