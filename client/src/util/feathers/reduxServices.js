import fRedux from 'feathers-redux'

export const requiresAuthServices = ['threads', 'comments']

export const publicServices = ['users', 'topics', 'blog']

export default (app) => {
  const services = fRedux(app, [...requiresAuthServices, ...publicServices])
  return services
}
