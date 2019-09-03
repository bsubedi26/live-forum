import { useEffect } from 'react'

const useClickOutside = (setDrawerOpen, elRef) => {
  // console.log('---useClickOutside: ')
  useEffect(() => {
    const handleClickOutside = e => {
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
  }, [elRef, setDrawerOpen])
  return [setDrawerOpen]
}

export default useClickOutside
