import fRedux from 'feathers-redux';

export const requiresAuthServices = [ 'threads', 'comments' ];

const publicServices = [ 'users', 'topics' ];

export default (app) => {
    const services = fRedux(app, [...requiresAuthServices, ...publicServices]);
    return services;
};