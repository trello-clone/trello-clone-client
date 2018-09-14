import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware,} from 'redux';
import {Provider,} from 'react-redux';
import {Router,} from 'react-router-dom';

import './index.scss';
import RootReducer from './rootReducer';
import App from './App';
import registerServiceWorker from 'utils/registerServiceWorker';
import apiMiddleware from 'utils/apiMiddleware';
import {history,} from 'utils/routes';

const store = createStore(RootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(apiMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
