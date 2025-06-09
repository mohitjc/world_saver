import React, { Suspense } from 'react';
import { PersistGate } from 'redux-persist/es/integration/react';
import { history } from './history';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routers from '../routers';
import { Provider } from 'react-redux';

import configureStore from '../config';

// import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/responsive-style.min.css';
import '../assets/css/colors/color-1.css';
import '../assets/style.css';
import '../assets/css/custom.css';
import '../assets/scss/style.scss';

/************ store configration *********/

const { persistor, store } = configureStore(history);
export const Loader = ({ className = '', id = '' }) => {
  return (
    <>
      <div id={id} className={`loaderDiv ${className}`}>
        <div className="loader_div">
          <img src="/assets/img/loader.gif" alt="logo" className="loaderlogo" />
        </div>
      </div>
    </>
  );
};

export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <Suspense fallback={<Loader />}>
          <ToastContainer />
          <Routers {...store} />
        </Suspense>
      </PersistGate>
    </Provider>
  );
};
