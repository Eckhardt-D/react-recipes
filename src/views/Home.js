import React, { Component, Fragment } from 'react'
import Recipes from '../components/Recipes'
import Navigation from '../components/Navigation'
import Landing from '../components/Landing'

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.scrollScreen = this.scrollScreen.bind(this)
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