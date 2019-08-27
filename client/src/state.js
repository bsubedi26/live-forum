import { setGlobal } from 'reactn'
import addReactNDevTools from 'reactn-devtools' // needs redux dep

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
  blog: {}
}

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

const setGlobalState = () => (
  setGlobal(initialState)
)

export default setGlobalState
