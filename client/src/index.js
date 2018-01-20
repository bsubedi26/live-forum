import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import configureStore from 'util/store';
import Routes from 'routes';

import 'styles/index.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const { store, persistor } = configureStore();
render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
        <Routes />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
