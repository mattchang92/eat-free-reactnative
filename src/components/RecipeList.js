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
  View,
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
      <View style={styles.container}>
        <View style={styles.scrollStyle}>
          <ListView dataSource={this.dataSource}
            renderRow={this.renderRow.bind(this)}/>
        </View>
      </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 5,
  },
  scrollStyle: {
    flex: 8,
    backgroundColor: "white",
    borderRadius: 3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    elevation: 2,
  },
});
