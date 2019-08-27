import app from '../util/feathers'

export const SERVICE_NAME = 'users'
export const Service = app.service(SERVICE_NAME)

export const signup = (payload) => Service.create(payload)
export const find = (payload) => Service.find(payload)
export const get = (id) => Service.get(id)

// Auth

export const authenticate = payload => app.authenticate(payload)
export const verifyToken = token => app.passport.verifyJWT(token)

export const logout = () => {
  window.localStorage.clear()
  return app.logout()
}
