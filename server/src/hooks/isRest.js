const isRest = () => async hook => hook.params.provider === 'rest';

module.exports = isRest;