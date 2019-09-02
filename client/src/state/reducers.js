import { addReducer } from 'reactn'
// import { isEmpty } from 'util/helpers'

/**
 * Dynamically creates reducers from provided services
 * @param {Object} services
 * @returns {null}
 */

export function makeReducers (Services) {
  for (var serviceName in Services) {
    const service = Services[serviceName]
    makeFind(service)
    makeCreate(service)
    makeGet(service)

    makeRemove(service)
    makePatch(service)
  }
}

/**
 * USAGE:
 * useDispatch('users/find')
 * useDispatch('users/create')
 * useDispatch('users/get')
 * useDispatch('users/patch')
 * useDispatch('users/remove')
 */
function makeFind (service) {
  const dispatchName = `${service.path}/find`
  addReducer(dispatchName, async (state, dispatch, payload) => {
    // if (!isEmpty(state[service.path])) return // check if data already exists in state before fetching
    const response = await service.find(payload)
    console.log('response: ', response)
    return {
      [service.path]: response.data ? response.data : response
    }
  })
}

function makeCreate (service) {
  const dispatchName = `${service.path}/create`
  addReducer(dispatchName, async (state, dispatch, payload) => {
    // console.log('dispatching service ', dispatchName)
    const data = await service.create(payload)
    return {
      [dispatchName]: data
    }
  })
}

function makeGet (service) {
  const dispatchName = `${service.path}/get`
  addReducer(dispatchName, async (state, dispatch, payload) => {
    // console.log('dispatching service ', dispatchName)
    const data = await service.get(payload)
    // console.log('data: ', data)
    return {
      [dispatchName]: data
    }
  })
}

function makeRemove (service) {
  const dispatchName = `${service.path}/remove`
  addReducer(dispatchName, async (state, dispatch, id, payload) => {
    // console.log('dispatching service ', dispatchName)
    const data = await service.remove(id)
    // console.log('data: ', data)
    return {
      [dispatchName]: data
    }
  })
}

function makePatch (service) {
  const dispatchName = `${service.path}/patch`
  addReducer(dispatchName, async (state, dispatch, id, payload) => {
    // console.log('dispatching service ', dispatchName)
    const data = await service.patch(id, payload)
    return {
      [dispatchName]: data
    }
  })
}
