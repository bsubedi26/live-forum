/* eslint-disable */
import { useEffect } from 'react'
import { useGlobal } from 'reactn'
import Services from './Services'

const onCreated = ({ state, setGlobal, service }) => data => {
  console.log(`-- EventListener ${service.path}: created: `, data)
  // console.log('state[service.path]: ', state[service.path]);
  const stateList = state[service.path]
  if (stateList) {
    setGlobal({
      [service.path]: [data].concat(stateList)
    })
  }
}

const onRemoved = ({ state, setGlobal, service }) => data => {
  console.log(`-- EventListener ${service.path}: removed: `, data)
  const stateList = state[service.path]
  if (stateList) {
    setGlobal({
      [service.path]: stateList.filter(item => data.id !== item.id)
    })
  }
}

const onPatched = ({ state, setGlobal, service }) => data => {
  console.log(`-- EventListener ${service.path}: patched: `, data)
  const stateList = state[service.path]
  if (stateList) {
    setGlobal({
      [service.path]: stateList.map(item => data.id === item.id ? data : item)
    })
  }
}

const onUpdated = ({ state, setGlobal, service }) => data => {
  console.log(`-- EventListener ${service.path}: updated: `, data)
  const stateList = state[service.path]
  if (stateList) {
    setGlobal({
      [service.path]: stateList.map(item => data.id === item.id ? data : item)
    })
  }
}

export default () => {
  const [state, setGlobal] = useGlobal()
  useEffect(() => {
    const addEventListeners = (state, setGlobal) => {
      for (var serviceName in Services) {
        const service = Services[serviceName]
        service.on('created', onCreated({ state, setGlobal, service }))
        service.on('removed', onRemoved({ state, setGlobal, service }))
        service.on('patched', onPatched({ state, setGlobal, service }))
        service.on('updated', onUpdated({ state, setGlobal, service }))
      }
    }
    addEventListeners(state, setGlobal)
  }, [])

  return null
}
