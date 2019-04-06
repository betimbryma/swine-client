import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import pigletReducer from "./store/reducers/piglet";
import cbtReducer from "./store/reducers/cbt";
import authReducer from "./store/reducers/auth";
import thunk from "redux-thunk";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {AUTHENTICATE} from "./store/actions/actionTypes";

const reducer = combineReducers({
    piglet: pigletReducer,
    cbt: cbtReducer,
    security: authReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

const jwt = localStorage.jwt;

if(jwt){
    const decodedJwt = jwt_decode(jwt);
    const currentTime = Date.now() / 1000;
    if(decodedJwt && decodedJwt.exp > currentTime){
        axios.defaults.headers.common["Authorization"] = jwt;
        store.dispatch({
            type: AUTHENTICATE,
            payload: decodedJwt,
            token: jwt
        });
    } else {
        window.location.href = "/";
        delete localStorage.jwt;
        delete axios.defaults.headers.common["Authorization"];
        store.dispatch({
            type: AUTHENTICATE,
            payload: {},
            token: null
        });
    }
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
