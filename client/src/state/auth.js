import { addReducer } from 'reactn'
import { storageKey } from 'util/feathers/app'

const initialState = {
  accessToken: null,
  authentication: {
    strategy: null,
    payload: {
      iat: null,
      exp: null,
      aud: null,
      iss: null,
      sub: null,
      jti: null
    }
  },
  user: {
    id: null,
    email: null,
    roles: null
  }
}

/** Put Auth Reducer dispatch functions here */
addReducer('user/authenticate', (state, dispatch, payload) => {
  return state.app.authenticate(payload)
    .then(response => ({
      auth: response
    }))
    .catch(error => ({
      error
    }))
})

addReducer('user/remove', async (state, dispatch, payload) => {
  await dispatch['users/remove'](payload)
  window.localStorage.removeItem(storageKey)
  state.app.set('authentication', null)
  return {
    auth: initialState
  }
})

addReducer('app/logout', async (state, dispatch, payload) => {
  await state.app.logout()
  return {
    auth: initialState
  }
})

export default initialState
