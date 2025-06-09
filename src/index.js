import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Modal from 'react-modal';
// import 'antd/dist/antd.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import enviroment from './environment/index';
// import App from './App';
import Main from './main';
import * as serviceWorker from './serviceWorker';
Modal.setAppElement('#root');
// import { createRoot } from 'react-dom/client';
// const container = document.getElementById('app')
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(<div>hello</div>);

ReactDOM.render(
  <GoogleOAuthProvider clientId={enviroment.googleclientId}>
    <Main />
  </GoogleOAuthProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
