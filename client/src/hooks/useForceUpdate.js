import { useCallback, useState } from 'react'

// Returning a new object reference guarantees that a before-and-after
//   equivalence check will always be false, resulting in a re-render, even
//   when multiple calls to forceUpdate are batched.
// returns () => void
export default function useForceUpdate () {
  const [, dispatch] = useState({})

  // Turn dispatch(required_parameter) into dispatch().
  const memoizedDispatch = useCallback(
    () => {
      dispatch({})
    },
    [dispatch]
  )
  return memoizedDispatch
}
