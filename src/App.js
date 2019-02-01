import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store'

import Home from './views/Home'
import OneRecipe from './views/OneRecipe'

import './App.css';
import PostRecipe from './components/PostRecipe';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/recipe/:id' component={OneRecipe}/>
              <Route exact path='/new' component={PostRecipe}/>
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
