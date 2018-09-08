import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,} from 'redux';
import {Provider,} from 'react-redux';

import './index.scss';
import RootReducer from './rootReducer';
import App from './App';
import registerServiceWorker from 'utils/registerServiceWorker';

const store = createStore(RootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
