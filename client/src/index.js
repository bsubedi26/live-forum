import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import setGlobalState from './state'
import App from './App'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'styles/index.css'

setGlobalState()

export const history = createBrowserHistory()

const RenderView = () => {
  return (
    <Router history={history}>
      <App />
    </Router>
  )
}

render(RenderView(), document.getElementById('root'))
