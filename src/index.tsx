import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { configureFakeApi } from './utilities/configureFakeApi';

// Sets up fake call so we don't need to implement backend
configureFakeApi();

ReactDOM.render(
  <React.StrictMode>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    {/* We could also use SVG icons, but not a decision thats necessarily important for this example */}
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
