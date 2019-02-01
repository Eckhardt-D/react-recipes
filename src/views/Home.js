import React, { Component, Fragment } from 'react'
import Recipes from '../components/Recipes'
import Navigation from '../components/Navigation'
import Landing from '../components/Landing'

export default class Home extends Component {
  render() {
    return (
      <Fragment>
        <Navigation/>
        <Landing/> 
        <Recipes/>
      </Fragment>
    ) 
  }  
}