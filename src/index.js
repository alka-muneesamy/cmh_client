import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import styles from "./styles.css"
import App from "./components/App";
import reducers from './reducers';
<link rel="stylesheet" href= "./styles.css" />


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 
const store = createStore(reducers,
                          composeEnhancers(applyMiddleware(thunk)));
                          

ReactDOM.render(
  <Provider store= {store}>
    <App />
  </Provider>,document.querySelector('#root')
);
