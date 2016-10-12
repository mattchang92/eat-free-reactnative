import React from 'react';
import FoodlogDetails from '../src/components/FoodlogDetails';

export default class FoodlogDetailsScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    }
  }

  render() {
    return <FoodlogDetails  recipe={this.props.route.params.recipe}
                            foodlogId={this.props.route.params.foodlogId}
                            navigator={this.props.navigator}/>
  }
}
