import React from 'react';
import {
  Location,
  Permissions,
} from 'exponent';
import { connect } from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  AsyncStorage,
  ListView,
} from 'react-native';

import RecipeListItem from './RecipeListItem';
import Router from '../../navigation/Router';
import RootNavigation from '../../navigation/RootNavigation'

class RecipeList extends React.Component {

  componentWillMount() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.dataSource = ds.cloneWithRows(this.props.recipes);
  }

  renderRow(recipe) {

    return (

      <RecipeListItem
        recipe={recipe}
        key={recipe.name}
        navigator={this.props.navigator}
      />
    )
  }

  render() {

    return (
      <ListView dataSource={this.dataSource}
                renderRow={this.renderRow.bind(this)}
      />
    )
}

}

const mapStateToProps = (state, ownProps) => {
  return { recipes: state.recipes, navigator: ownProps.navigator }
}

export default connect(mapStateToProps)(RecipeList)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
});
