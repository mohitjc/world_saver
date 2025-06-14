/*
 * @file: configureStore.prod.js
 * @description: Configure/creating redux store with thunk,reducer etc
 * @author: Poonam
 * */

import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import reducers from '../reducers';

export default (history) => {
  const store = createStore(reducers, compose(applyMiddleware(thunk)));
  const persistor = persistStore(store);

  return { persistor, store };
};
