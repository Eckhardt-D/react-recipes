import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import update from 'immutability-helper'
import newUid from 'uuid/v1'
import {auth} from '../services/firebase'

import { createRecipe } from '../actions/recipeActions'
import IngredientInput from './IngredientInput'
import Navigation from './Navigation'

import { FormGroup, Label, FormText, InputGroup, Input, Container, Button } from 'reactstrap';

class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numberOfIngredients: 0,
      name: '',
      description: '',
      ingredients: [],
      instructions: '',
      image: '',
      createdBy: '',
      time: '',
      isLoading: false
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.addIngredient = this.addIngredient.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
  }

  componentWillMount() {
    auth.onAuthStateChanged(user => {
      if(!user) {
        window.location.href = '/'
      } else {
        this.setState({createdBy: user.uid})
      }
    }) 
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onChangeIngredient(e, i) {
    const value = e.currentTarget.value
    this.setState({
      // Tell me this isn't magical :'D
      ingredients: update(this.state.ingredients, {[i]: {$set: value}})
    })
  }

  addIngredient() {
    this.setState({
      numberOfIngredients: this.state.numberOfIngredients + 1
    })
  }

  onSubmit(e) {
    this.setState({isLoading: true})
    e.preventDefault()

    const recipe = {
      name: this.state.name,
      id: newUid(),
      description: this.state.description,
      ingredients: this.state.ingredients,
      instructions: this.state.instructions,
      created: new Date().toLocaleDateString('en-US'),
      image: this.state.image,
      createdBy: this.state.createdBy,
      time: this.state.time
    }

    this.props.createRecipe(recipe).then(() => {
      this.setState({isLoading: false})
      window.location.href = '/'
    })
    .catch(e => e)
  }

  setImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error);
    })
  }

  uploadImage(e) {
    const file = e.target.files[0]
    if(file.type.indexOf('image') !== -1) {
      this.setImage(file).then(res => this.setState({image: res}))
      .catch(e => console.log(e))
    }
  }

  render() {
    let inputs = []
    for(let i = 0; i < this.state.numberOfIngredients; i++) {
      inputs.push(<IngredientInput key={i} id={'input-'+ (i+1)} onChangeProp={e => this.onChangeIngredient(e, (i+1))}/>)
    }
    return (
      <div>
      <Navigation/>
      <Container className="mt-5">
        <h1>Add Recipe</h1>
        <form onSubmit={this.onSubmit}>
          <div>
              <InputGroup>
                <Input required onChange={this.onChange} name="name" placeholder="Recipe name" />
              </InputGroup>
          </div>
          <br />
          <div>
              <InputGroup>
                <Input required type="number" onChange={this.onChange} name="time" placeholder="Cook Time (Minutes)" />
              </InputGroup>
          </div>
          <br />
          <div>
            <InputGroup>
              <Input required type="textarea" onChange={this.onChange} name="description" placeholder="Recipe description" />
            </InputGroup>
          </div>
          <br />
          <div>
          <InputGroup>
            <Input required id="initialInput" onChange={e => this.onChangeIngredient(e, 0)} name="ingredient" placeholder="Ingredient name and amount in units" />
          </InputGroup>
          </div>
          <br />
          <div id="IngredientInputHolder">
            {inputs}
          </div>
          <Button className="mb-4" color="warning" onClick={this.addIngredient}>Add Ingredient</Button>
          <br />
          <div>
          <InputGroup>
            <Input type="textarea" id="initialInput" onChange={this.onChange} name="instructions" placeholder="Cooking Instructions" />
          </InputGroup>
          </div>
          <br />
          <FormGroup>
            <Label for="exampleFile">Upload a cover image</Label>
            <Input onChange={this.uploadImage} required type="file" name="file" id="exampleFile" />
            <FormText color="muted">
              The cover image will look best if it is 1280x720
            </FormText>
          </FormGroup>
          {this.state.image !== ''? <img onChange={this.uploadImage} className="mb-4" width="100%" src={this.state.image} alt="of food"/> : ''}
          <Button className="mb-4" color="success" type="submit">{!this.state.isLoading ? 'Submit' : 'Loading...'}</Button>
        </form>
      </Container>
      </div>
    )
  }
}

PostForm.propTypes = {
  createRecipe: PropTypes.func.isRequired
}

export default connect(null, { createRecipe })(PostForm)