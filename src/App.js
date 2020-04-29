import React from 'react';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import promise from 'redux-promise';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './store/reducers';

import App from './pages';

const createStoreWithMiddleware = applyMiddleware(
  promise,
  thunkMiddleware
)(createStore);

export default () => {
  return (
    <Provider store={createStoreWithMiddleware(reducers)}>
      <App />
    </Provider>
  );
};
