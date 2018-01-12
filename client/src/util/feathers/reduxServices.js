import fRedux from 'feathers-redux';

export default (app) => {
    const services = fRedux(app, ['users', 'forums', 'comments', 'topics']);
    return services;
};