// // https://medium.com/@Charles_Stover/how-to-convert-withrouter-to-a-react-hook-19bb02a29ed6
// // mount > effect1 ... effect2 > update > effect1 ... effect2 > unmount

// import React from 'react'
// import { useForceUpdate } from './useForceUpdate'

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

// const useReactRouter = () => {
//   const forceUpdate = useForceUpdate();

//   const routerContext = React.useContext(__RouterContext);
//   /* TODO */
//   return routerContext;
// };

// The effect is to subscribe and return the unsubscribe function.
// useEffect(
//   () => routerContext.history.listen(forceUpdate),
//   [routerContext]
// )
