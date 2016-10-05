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
  AsyncStorage,
} from 'react-native';

import RecipeListItem from './RecipeListItem';
import Router from '../navigation/Router';
import RootNavigation from '../navigation/RootNavigation'
import ENV from '../app_keys'

export default class RecipeList extends React.Component {
  state = {
    recipes: [],
  }

  componentDidMount() {
    AsyncStorage.getItem('UserApiKey').then(key => {
      fetch(ENV.BASE_URL + "/api/v1/recipes", {
        headers: {
          'CLIENT_KEY': ENV.CLIENT_KEY,
          'api_key': key
        }
      })
      .then(response => response.json())
      .then(json => this.receivedRecipes(json) )
      // .then(function(response){return response.json()})
      // .then(function(json){ this.setState({ recipes: json }) }.bind(this))
     })

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
