import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import mainTheme from './components/style/mainTheme.js';
import { MuiThemeProvider } from '@material-ui/core/styles';
//Go To Top Buton Import
import GoToTop from "./components/ScrolltoTop";


ReactDOM.render(
    <MuiThemeProvider theme = { mainTheme }>
    <App />
    <GoToTop showBelow={250} />
  </MuiThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
