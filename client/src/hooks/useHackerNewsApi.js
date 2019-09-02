import { useState, useEffect, useReducer } from 'react'

// using effect/state
const useHackerNewsApi = () => {
  const [data, setData] = useState({ hits: [] })
  const [url, setUrl] = useState(
    'https://hn.algolia.com/api/v1/search?query=redux'
  )
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const result = await window.fetch(url)
        setData(result.data)
      } catch (error) {
        setIsError(true)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [url])

  return [{ data, isLoading, isError }, setUrl]
}

// using effect/reducer
export const useHackerNewsApi2 = () => {
  const initState = {
    url: 'https://hn.algolia.com/api/v1/search?query=redux',
    isLoading: false,
    isError: false,
    error: {},
    data: {}
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'IS_LOADING':
        return {
          ...state,
          isLoading: action.payload
        }
      case 'IS_ERROR':
        return {
          ...state,
          isError: true,
          error: action.payload
        }
      case 'IS_DATA':
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload
        }
      case 'SET_URL':
        return {
          ...state,
          url: action.payload
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initState)
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'IS_LOADING', payload: true })

      try {
        const result = await window.fetch(state.url)
        dispatch({ type: 'IS_DATA', payload: result })
      } catch (error) {
        dispatch({ type: 'IS_ERROR', payload: error })
      }
      dispatch({ type: 'IS_LOADING', payload: false })
    }
    fetchData()
  }, [state.url])

  return [state, dispatch]
}

export default useHackerNewsApi
