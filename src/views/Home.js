import React, { Component, Fragment } from 'react'
import Recipes from '../components/Recipes'
import Navigation from '../components/Navigation'
import Landing from '../components/Landing'
import {auth} from '../services/firebase'

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.scrollScreen = this.scrollScreen.bind(this)
  }

  componentWillMount() {
    auth.onAuthStateChanged(user => !user ? window.location.href = '/' : null) 
  }

  scrollScreen() {
    window.scrollTo({left: 0, top: 970, behavior: 'smooth'})
  }

  render() {
    return (
      <Fragment>
        <Navigation/>
        <Landing onButtonClick={this.scrollScreen}/> 
        <Recipes/>
      </Fragment>
    ) 
  }  
}