import React from 'react';
import FoodlogList from '../src/components/FoodlogList';
import { connect } from 'react-redux'
import * as actions from '../src/actions'

class FoodlogScreen extends React.Component {
  static route = {
    navigationBar: {
      title: "Today's Log",
    }
  }

  componentWillMount() {
    this.props.updateFoodlog();
  }

  render() {
    return <FoodlogList navigator={this.props.navigator} />
  }
}


export default connect(null, actions)(FoodlogScreen)
