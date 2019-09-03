import { useEffect } from 'react'

const useClickOutside = (elRef, setDrawerOpen) => {
  // console.log('---useClickOutside: ')
  useEffect(() => {
    const handleClickOutside = e => {
    // console.log('clicked anywhere: ')
      if (elRef.current.contains(e.target)) {
      // inside elRef container clicked
        // console.log('inside click: ')
        return
      }
      // outside elRef container clicked
      // console.log('outside click: ')
      setDrawerOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  return [setDrawerOpen]
}

export default useClickOutside
