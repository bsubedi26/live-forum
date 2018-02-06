import React from 'react';
import LoadingProgressBar from 'react-redux-loading-bar';

function LoadingBar() {
  return (
    <LoadingProgressBar style={{position: 'fixed', top: 0, backgroundColor: 'green'}} scope="nav-top" />
  )
}

export default LoadingBar;