import fRedux from 'feathers-redux';

export default (app) => {
    const services = fRedux(app, ['user', 'forum', 'comment']);
    return services;
};