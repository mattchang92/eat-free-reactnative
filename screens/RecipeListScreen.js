import React from 'react';
import RecipeList from '../src/components/RecipeList';

export default class RecipeListScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Recipes',
    }
  }

  render() {
    return <RecipeList navigator={this.props.navigator} />
  }
}
