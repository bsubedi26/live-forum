// // https://medium.com/@Charles_Stover/how-to-convert-withrouter-to-a-react-hook-19bb02a29ed6
// // mount > effect1 ... effect2 > update > effect1 ... effect2 > unmount

import React from 'react'
import { useForceUpdate } from './useForceUpdate'

// const CC = () => {
//   useReactRouter()
//   React.useEffect(
//     () => {
//       const unsubscribe = routerContext.history.listen()
//       // TODO: subscribe
//       return () => {
//         // TODO: unsubscribe
//         unsubscribe()
//       };
//     },
//     [
//       /* TODO: memoization parameters here */
//       routerContext
//     ]
//   )
// }

export const useReactRouter = () => {
  const routerContext = React.useContext(window.__RouterContext)
  console.log('routerContext: ', routerContext)
  /* TODO */
  return routerContext
}

// The effect is to subscribe and return the unsubscribe function.
React.useEffect(
  () => window.routerContext.history.listen(useForceUpdate()),
  [window.routerContext]
)
