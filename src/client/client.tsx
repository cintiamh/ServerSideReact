// Startup point for the client side application
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// there is already HTML from server
ReactDOM.hydrate(<App />, document.getElementById('root'));
