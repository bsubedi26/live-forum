import { setGlobal } from 'reactn'
import addReactNDevTools from 'reactn-devtools'

addReactNDevTools()

const initialState = {
  auth: {},
  users: {},
  threads: {},
  comments: {},
  topics: {},
  blog: {}
}

const setGlobalState = () => (
  setGlobal(initialState)
)

export default setGlobalState
