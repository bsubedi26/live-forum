import fRedux from 'feathers-redux';

export default (app) => {
    const services = fRedux(app, ['users', 'threads', 'comments', 'topics']);
    return services;
};