import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './views/Home'
import Login from './views/Login'
import OneRecipe from './views/OneRecipe'

import './App.css';
import PostRecipe from './components/PostRecipe'


class App extends Component {
  
  render() {
    return (
        <div className="App">
          <Router>
            <Switch>
              <Route exact path='/' component={Login}/>
              <Route exact path='/home' component={Home}/>
              <Route exact path='/recipe/:id' component={OneRecipe}/>
              <Route exact path='/new' component={PostRecipe}/>
            </Switch>
          </Router>
        </div>
    );
  }
}

export default App