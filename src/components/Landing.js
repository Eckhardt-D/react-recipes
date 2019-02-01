import React, { Component } from 'react'
import { Jumbotron, Button } from 'reactstrap';

import './Landing.css'

export default class Landing extends Component {
  scrollScreen() {
    console.log('clicked')
    window.scrollTo({left: 0, top: 970, behavior: 'smooth'})
  }
  render() {
    return (
      <div className="landingContainer">
        <Jumbotron className="landingJumbo">
          <h1 className="display-4 text-center mb-4">Welcome to your Recipe App!</h1>
          <p className="lead">This app is perfect for that in-the-moment recipe you need to save.</p>
          <hr className="my-2" />
          <p> It's just a place where you can add, edit and delete recipes.</p>
          <p className="lead">
            <Button onClick={this.scrollScreen} className="mt-3" color="primary">Recent recipes</Button>
          </p>
        </Jumbotron>
      </div>
    )
  }
}