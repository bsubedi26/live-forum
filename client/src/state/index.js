import { setGlobal } from 'reactn'
import addReactNDevTools from 'reactn-devtools' // needs redux dep
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
  topic: {},
  blog: {},
  movies: []
}

const setGlobalState = () => (
  setGlobal(initialState)
)

export const fetchAndSet = (fetchFunc, stateKey, fetchFuncOption) => {
  setGlobal(
    fetchFunc(fetchFuncOption)
      .then((response) => {
        return response.data
          ? ({ [stateKey]: response.data })
          : ({ [stateKey]: response })
      })
      .catch(err => ({ error: err }))
  )
}

export default setGlobalState
