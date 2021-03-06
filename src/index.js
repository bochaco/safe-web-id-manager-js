import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import "@babel/polyfill";

import App from './containers/App';
import rootReducer from './reducers';

if ( window.webIdEventEmitter )
{
    console.log( 'webId emitter exists!' );

    window.webIdEventEmitter.once( 'update', ( webId ) =>
    {
        console.log( 'WebId has been updated (though not sure what to do with it...)', webId );
    } );
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk, promiseMiddleware];
const enhancer = composeEnhancers( applyMiddleware( ...middleware ) );


function configureStore( initialState )
{
    return createStore(
        rootReducer,
        initialState,
        enhancer
    );
}

const store = configureStore( {} );

const reactRoot = document.getElementById( 'react-root' );

render(
    <HashRouter>
        <App store={ store } />
    </HashRouter>
    ,
    reactRoot
);
