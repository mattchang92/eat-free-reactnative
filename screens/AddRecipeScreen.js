import React from 'react';
import AddRecipe from '../src/components/AddRecipe';

export default class AddRecipeScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    }
  }

  render() {
    return <AddRecipe recipe={this.props.route.params.recipe} />
  }
}
