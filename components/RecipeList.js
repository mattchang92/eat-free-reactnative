import React from 'react';
import {
  Location,
  Permissions,
} from 'exponent';
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import RecipeListItem from './RecipeListItem';
import Router from '../navigation/Router';

export default class RecipeList extends React.Component {
  state = {
    recipes: [],
  }

  componentDidMount() {
    fetch("http://localhost:3000/recipes.json")
      .then(response => response.json())
      .then(json => this.receivedRecipes(json) )
      // .then(function(response){return response.json()})
      // .then(function(json){ this.setState({ recipes: json }) }.bind(this))
  }

  receivedRecipes(data){
    this.setState({
      recipes: data,
    })
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {
          this.state.recipes.map(recipe => (
            <RecipeListItem
              recipe={recipe}

              key={recipe.name}
              navigator={this.props.navigator}
            />
          ))
        }

      </ScrollView>
    );
  }



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
});
