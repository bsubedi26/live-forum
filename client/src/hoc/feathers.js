import app from '../util/feathers'
console.log('app: ', app)

const FeathersBridge = (Component) => props => {
  const feathersProps = app
  return <Component {...props} {...feathersProps} />
}

export default FeathersBridge
