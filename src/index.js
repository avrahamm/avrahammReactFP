import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './App';
//@link: https://redux.js.org/introduction/why-rtk-is-redux-today
import {compose, legacy_createStore} from 'redux';
import { Provider } from 'react-redux';
// import mainreducer from './reducers/mainreducer';
import reducer from './reducers'
import middleware from './middleware';

const appStore = legacy_createStore(
    reducer,
    /* preloadedState, */ undefined,
    compose(
        middleware,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    ),);

ReactDOM.render(
    <Provider store={appStore}>
        <BrowserRouter>
            <Route component={App}/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
