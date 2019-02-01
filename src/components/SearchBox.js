import React, { Component } from 'react'
import {fetchRecipes} from '../actions/recipeActions'
import { connect } from 'react-redux'

import { InputGroup, InputGroupAddon, Button, Input, ListGroup, ListGroupItem } from 'reactstrap';

import './Navigation.css'

class SearchBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: ''
    }
    this.onChange = this.onChange.bind(this)
    this.goAhead = this.goAhead.bind(this)
  }

  componentDidMount() {
    const searchList = document.querySelector('.searchList2')
    const searcher = document.querySelector('#searcher')
    searcher.addEventListener('blur', e => { 
      if(e.target.id !== 'searcher') {
        searchList.style.display = 'none'
      }
    })
  }

  onChange(e) {
    let val = e.currentTarget.value
    document.querySelector('.searchList2').style.display = 'block'
    if(val !== '') {
      this.setState({searchValue: val})
    } else {
      document.querySelector('.searchList2').style.display = 'none'
    }
  }

  goAhead(id) {
    window.location.href = '/recipe/'+id
  }

  render() {
  const ingredientList = this.props.recipes && this.props.recipes.length ? (
    this.props.recipes.map(
      recipe => recipe.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ? 
      <ListGroupItem onClick={() => this.goAhead(recipe.id)} key={recipe.id}>{recipe.name}</ListGroupItem> :
      <ListGroupItem key="0">No results</ListGroupItem>)
  ) : ''
  return (
    <div style={{position: "relative"}}>
      <InputGroup>
        <Input id="searcher" onChange={this.onChange} placeholder="Search for a recipe" />
        <InputGroupAddon addonType="append">
          <Button color="success">Search</Button>
        </InputGroupAddon>
      </InputGroup>
      <ListGroup className="searchList2">
        { ingredientList }
      </ListGroup>
    </div>
   );
  }
};

const mapStateToProps = state => ({
  recipes: state.recipes.items,
  newRecipe: state.recipes.item
});

export default connect(mapStateToProps, { fetchRecipes })(SearchBox);