import React from 'react';
import LoadingProgressBar from 'react-redux-loading-bar';

function LoadingBar() {
  return (
    <LoadingProgressBar style={{padding: 0, position: 'fixed', top: 0, backgroundColor: 'blue'}} scope="nav-top" />
  )
}

export default LoadingBar;
