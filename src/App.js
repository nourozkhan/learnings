import React, { Component } from 'react';
import './App.css';
import './config';
import Routes from './routes.js';
import store from './store/index.js';
import { Provider } from 'react-redux';

class App extends Component {

  render() {
    return (
      <Provider store={ store }>
        {Routes}
      </Provider>
    );
  }
}

export default App;
