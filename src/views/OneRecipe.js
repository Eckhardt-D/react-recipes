import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { fetchRecipes } from '../actions/recipeActions';
import { auth } from '../services/firebase'

import {
  Container,
  Row,
  Col,
  ListGroup, 
  ListGroupItem
} from 'reactstrap'

import './OneRecipe.css'

import Navigation from '../components/Navigation'

class OneRecipe extends Component {
  componentWillMount() {
    auth.onAuthStateChanged(user => !user ? window.location.href = '/' : null) 
  }
  componentDidMount() {
    this.props.fetchRecipes()
  }

  render() {
    let theRecipe
    this.props.recipes.forEach(recipe => {
      if(recipe.id === this.props.match.params.id) {
        theRecipe = (
          <Col sm="12" lg="10" className="mx-auto mb-5">
            <img 
            width="100%"
            src={recipe.image} alt="MyRecipe"/>
            <div className="recipeTitle my-3">
              <h2 className="display-6">{recipe.name}</h2>
              <p className="text-muted mb-0">{recipe.time} min</p>
            </div>
            <p className="mb-0">{recipe.description}</p>
            <br/>
            <hr/>
            <h2 className="display-6">The ingredients</h2>
            <ListGroup className="my-3">
              {recipe.ingredients.map((ingredient, index) => <ListGroupItem key={index}>{ingredient}</ListGroupItem>)}
            </ListGroup>
            <br/>
            <hr/>
            <h2 className="display-6">Instructions</h2>
            <p>{recipe.instructions}</p>
            <p><small>by {recipe.createdBy}</small></p>
            <hr/>
            <a href="/">Back to recipes</a>
          </Col>
        )
      }
    })
    return (
      <Fragment>
        <Navigation/>
        <Container>
          <Row>
            {theRecipe}
          </Row>
        </Container>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes.items
});

export default connect(mapStateToProps, { fetchRecipes })(OneRecipe);