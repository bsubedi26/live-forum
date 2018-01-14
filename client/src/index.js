import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/es/integration/react';

import configureStore from 'util/store';
import Routes from 'routes';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import 'assets/styles/main.css';

// const { store, persistor } = configureStore();
const { store } = configureStore();

render(
  <Provider store={store}>
    {/* <PersistGate persistor={persistor}> */}
        <Routes />
    {/* </PersistGate> */}
  </Provider>,
  document.getElementById('root')
)
