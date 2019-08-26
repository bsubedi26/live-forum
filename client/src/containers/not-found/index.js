import React from 'react'
import { Link } from 'react-router-dom'
import { FadeIn } from 'animate-css-styled-components'

const NotFound = () => {
  return (
    <div>
      <FadeIn>
        <div className='jumbotron'>
          <h1 className='display-3'>Oh No! 404!</h1>
          <p className='lead'>The page you request was not found.</p>
          <hr className='my-4' />
          <p className='lead'>
            <Link to='/home' className='btn btn-outline-primary btn-lg pointer'>Go Home</Link>
            {/* <button onClick={this.goBack.bind(this)} className="btn btn-outline-info btn-lg pointer mx-3">Go Back</button> */}
          </p>
        </div>
      </FadeIn>
    </div>
  )
}

export default NotFound
