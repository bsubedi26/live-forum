import app from '../util/feathers'

const UserService = app.service('users')

export const signup = (payload) => UserService.create(payload)
export const find = (payload) => UserService.find(payload)
export const get = (id) => UserService.get(id)

// Auth

export const authenticate = payload => app.authenticate(payload)
export const verifyToken = token => app.passport.verifyJWT(token)

export const logout = () => {
  window.localStorage.clear()
  return app.logout()
}
