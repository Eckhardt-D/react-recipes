import React from 'react'
import { InputGroup, Input } from 'reactstrap';

class IngredientInput extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
  }
  render() {

    return (
      <InputGroup className="mb-4">
        <Input required id={this.props.id} onChange={this.props.onChangeProp} name="ingredient" placeholder="Ingredient name and amount in units" />
      </InputGroup>
    )
  }
}

export default IngredientInput