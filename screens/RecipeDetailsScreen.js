import React from 'react';
import RecipeDetails from '../src/components/RecipeDetails';

export default class RecipeDetailsScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    }
  }

  render() {
    return <RecipeDetails recipe={this.props.route.params.recipe} />
  }
}
