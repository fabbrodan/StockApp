import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './Pages/LoginPage';

ReactDOM.render(
  <React.StrictMode>
    <App newPage={<LoginPage/>}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
