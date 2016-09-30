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
import { Router } from '../main';

export default class RecipeList extends React.Component {
  state = {
    recipes,
  }

  render() {
    console.log(this);
    return (
      <ScrollView style={styles.container}>
        {
          this.state.recipes.map(recipe => (
            <RecipeListItem
              recipe={recipe}
              onPress={() => console.log('inside click handle')}
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
