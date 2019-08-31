import React from 'react'

export default ({ match }) => {
  const { id } = match.params

  // React.useEffect(() => {
  // }, [id])

  return (
    <div className='row mx-0'>
      id: {id}
    </div>
  )
}
