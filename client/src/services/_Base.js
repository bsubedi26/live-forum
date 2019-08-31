function getCrudFunctions (Service) {
  return {
    find: (payload) => Service.find(payload),
    get: (id) => Service.get(id),
    create: (payload) => Service.create(payload),
    patch: (id, payload) => Service.patch(id, payload),
    remove: (id, payload) => Service.remove(id, payload)
  }
}

function BaseCrud ({ Service, ...childFunctions }) {
  const withCrudFunctions = {
    ...Service,
    ...getCrudFunctions(Service),
    ...childFunctions
  }
  return withCrudFunctions
}

export default BaseCrud
