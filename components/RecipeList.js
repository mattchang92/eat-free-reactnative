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
import geolib from 'geolib';

import RecipeListItem from './RecipeListItem';
import recipes from '../data';


export default class RecipeList extends React.Component {
  state = {
    recipes,
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {
          this.state.recipes.map(recipe => (
            <RecipeListItem
              recipe={recipe}
              key={recipe.name}
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
